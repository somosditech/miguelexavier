<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Bus\Queueable;

class PasswordResetNotification extends Notification
{
    use Queueable;

    protected $token;

    /**
     * Create a new notification instance.
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = env('ADMIN_URL', 'http://127.0.0.1:8000/p_admin') . '/reset-password/' . $this->token;

        return (new MailMessage)
            ->subject('Redefinição de Senha - Painel Administrativo')
            ->greeting('Olá!')
            ->line('Você está recebendo este email porque recebemos uma solicitação de redefinição de senha para sua conta.')
            ->action('Redefinir Senha', $url)
            ->line('Este link de redefinição de senha expirará em 60 minutos.')
            ->line('Se você não solicitou a redefinição de senha, nenhuma ação adicional é necessária.')
            ->salutation('Atenciosamente, Equipe ' . config('app.name'))
            ->line('Email enviado automaticamente, por favor, não responda a este email.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
