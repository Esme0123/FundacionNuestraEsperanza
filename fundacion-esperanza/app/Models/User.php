<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\HasName;

class User extends Authenticatable implements HasName 
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'personas';
    protected $primaryKey = 'id_persona';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',      
        'apellido_paterno',  
        'ci',          
        'correo_electronico',      
        'contrasenia',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'contrasenia',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function getAuthPassword()
    {
        return $this->contrasenia;
    }
    public function getFilamentName(): string
    {
        return (string) $this->nombre . ' ' . (string) $this->apellido_paterno;
    }

    public function getNameAttribute()
    {
        return "{$this->nombre} {$this->apellido_paterno}";
    }
}
