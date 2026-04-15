<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HotsiteLink;
use Illuminate\Http\Request;

class HotsiteLinkController extends Controller
{
    /**
     * List all hotsite links (ordered).
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data'    => HotsiteLink::orderBy('order')->get(),
        ]);
    }

    /**
     * Show a single link.
     */
    public function show(HotsiteLink $hotsiteLink)
    {
        return response()->json([
            'success' => true,
            'data'    => $hotsiteLink,
        ]);
    }

    /**
     * Update a link – url and is_active can be empty/false.
     */
    public function update(Request $request, HotsiteLink $hotsiteLink)
    {
        $data = $request->validate([
            'url'       => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        // Prepend mailto: if label is E-Mail and it's missing
        if (isset($data['url']) && !empty($data['url'])) {
            $label = strtolower($hotsiteLink->label);
            if (($label === 'e-mail' || $label === 'email') && !str_starts_with(strtolower($data['url']), 'mailto:')) {
                $data['url'] = 'mailto:' . ltrim($data['url']);
            }
        }

        $hotsiteLink->update($data);

        return response()->json([
            'success' => true,
            'data'    => $hotsiteLink,
        ]);
    }
}
