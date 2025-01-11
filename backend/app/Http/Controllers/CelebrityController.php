<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchCelebrityRequest;
use App\Http\Requests\StoreCelebrityRequest;
use App\Models\Celebrity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CelebrityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  SearchCelebrityRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function search(SearchCelebrityRequest $request)
    {
        $validated = $request->validated();

        $data = Http::withHeaders([
            'X-Api-Key' => config('app.celebrity.api_key')
        ])->get('https://api.api-ninjas.com/v1/celebrity?name=' . $validated['name']);

        return $data->json();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCelebrityRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCelebrityRequest $request)
    {
        $validated = $request->validated();

        Celebrity::firstOrCreate($validated);

        return response()->json([
            'message' => $validated['name'] . ' Celebrity created successfully '
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Celebrity::query();

        // Get sorting parameters from the request
        $sorts = $request->query('sort', []);

        // Apply sorting to the query
        foreach ($sorts as $sort) {
            $direction = 'asc';
            if (substr($sort, 0, 1) === '-') {
                $direction = 'desc';
                $sort = substr($sort, 1);
            }
            $query->orderBy($sort, $direction);
        }

        return $query->get();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $celebrity = Celebrity::find($id);

        if ($celebrity) {
            $celebrity->delete();

            return response()->json([
                'message' => 'Celebrity deleted successfully'
            ]);
        }

        return response()->json([
            'message' => 'Celebrity not found'
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  StoreCelebrityRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreCelebrityRequest $request, $id)
    {
        $validated = $request->validated();

        $celebrity = Celebrity::find($id);

        if ($celebrity) {
            $celebrity->update($validated);

            return response()->json([
                'message' => 'Celebrity updated successfully'
            ]);
        }

        return response()->json([
            'message' => 'Celebrity not found'
        ], 404);
    }
}
