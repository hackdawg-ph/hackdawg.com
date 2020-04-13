<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MessageSent extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * The message payload containing: name, email, message.
     *
     * @var array
     */
    protected $data;

    /**
     * Create a new message instance.
     *
     * @param array $data
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->from($this->data['email'])
            ->to('hello@hackdawg.com')
            ->markdown('emails.messages.sent', [
                'data' => $this->data,
            ]);
    }
}
