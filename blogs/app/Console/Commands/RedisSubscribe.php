<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Log;
use App\Models\Post;

class RedisSubscribe extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:redis-sub';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Subscribe to Redis channels and handle messages.';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting Redis subscription...');
        Redis::subscribe(['post-created', 'post-updated', 'post-deleted'], function (string $message, string $channel) {
            $data = json_decode($message, true);
            $this->info('Received message on ' . $channel . ': ' . print_r($data, true));

            try {
                $this->handleChannelMessage($channel, $data);
            } catch (\Exception $e) {
                $this->error('Error: ' . $e->getMessage());
            }
        });
    }

    /**
     * Handle the message according to the channel.
     *
     * @param string $channel
     * @param array $data
     */
    protected function handleChannelMessage(string $channel, array $data)
    {
        $channelActions = $this->getChannelActions();

        if (array_key_exists($channel, $channelActions)) {
            $channelActions[$channel]($data);
        } else {
            $this->info('No handler defined for channel: ' . $channel);
        }
    }

    /**
     * Get the mapping of channels to actions.
     *
     * @return array
     */
    protected function getChannelActions(): array
    {
        return [
            'post-created' => function ($data) {
                $this->createPost($data);
            },
            'post-updated' => function ($data) {
                $this->updatePost($data);
            },
            'post-deleted' => function ($data) {
                $this->deletePost($data);
            },
        ];
    }

    /**
     * Create a new post from the received data.
     *
     * @param array $data
     */
    protected function createPost(array $data)
    {
        try{
            Post::create([
                'id' => $data['_id'],
                'title' => $data['title'],
                'user_id' => $data['userId'],
                'avg_read_time' => 3,
                'body' => $data['content'][0]['data'],
            ]);
        }catch(Exception $e){
            $this->info($e);
        }
    }

    /**
     * Update an existing post with the received data.
     *
     * @param array $data
     */
    protected function updatePost(array $data)
    {
        Post::where('id', $data['_id'])->update([
            'user_id' => $data['userId'],
            'avg_read_time' => 3,
            'title' => $data['title'],
            'body' => $data['data'][0]['data'],
        ]);
    }

    /**
     * Delete a post with the received data.
     *
     * @param array $data
     */
    protected function deletePost(array $data)
    {
        Post::where('id', $data['_id'])->delete();
    }
}
