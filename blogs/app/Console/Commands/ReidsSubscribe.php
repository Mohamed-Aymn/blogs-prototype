<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Log;
use App\Models\Post;


class ReidsSubscribe extends Command
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
    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('start handling');
        Redis::subscribe(['post-created'], function ($message) {
            $data = json_decode($message, true);
            $this->info('Received message: ' . print_r($data, true));

            try {
                $post = Post::create([
                    'user_id' => $data['userId'], 
                    'id' => $data['_id'], 
                    'avg_read_time' => 3,
                    'title' => $data['title'],
                    'body' => $data['data'][0]['data'],
                ]);
            } catch (\Exception $e) {
                $this->info('error: ' . print_r($e, true));
            }
        });
    }
}
