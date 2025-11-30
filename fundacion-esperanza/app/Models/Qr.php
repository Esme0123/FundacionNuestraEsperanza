<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Qr extends Model
{
    protected $table = 'qrs';
    
    public $timestamps = false; // Custom timestamps in migration

    protected $fillable = [
        'code',
        'url',
        'creation_date',
        'expiration_date',
        'description',
        'campaign_id',
    ];

    protected $casts = [
        'creation_date' => 'datetime',
        'expiration_date' => 'datetime',
    ];

    /**
     * A QR belongs to a campaign.
     */
    public function campaign(): BelongsTo
    {
        return $this->belongsTo(Campaign::class);
    }

    /**
     * A QR can have many donations.
     */
    public function donations(): HasMany
    {
        return $this->hasMany(Donation::class);
    }
}
