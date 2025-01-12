<?php

namespace Tests\Feature;

use App\Models\Celebrity;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CelebrityControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;


    /** @test */
    public function it_can_store_a_celebrity()
    {
        $celebrityData = [
            'name' => 'John Doe',
            'net_worth' => '1000000',
            'gender' => 'Male',
            'nationality' => 'American',
            'height' => 180,
            'birthday' => '1980-01-01',
            'age' => '41',
            'is_alive' => true
        ];

        $response = $this->postJson('/api/store', $celebrityData);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'John Doe Celebrity created successfully '
        ]);

        $this->assertDatabaseHas('celebrities', $celebrityData);
    }

    /** @test */
    public function it_can_list_celebrities()
    {
        Celebrity::factory()->count(3)->create();

        $response = $this->getJson('/api/list');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => ['id', 'name', 'net_worth', 'gender', 'nationality', 'height', 'birthday', 'age', 'is_alive', 'created_at', 'updated_at']
        ]);
    }

    /** @test */
    public function it_can_update_a_celebrity()
    {
        $celebrity = Celebrity::factory()->create();

        $updateData = [
            'name' => 'Jane Doe',
            'net_worth' => '2000000'
        ];

        $response = $this->putJson('/api/update/' . $celebrity->id, $updateData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('celebrities', $updateData);
    }

    /** @test */
    public function it_can_delete_a_celebrity()
    {
        $celebrity = Celebrity::factory()->create();

        $response = $this->deleteJson('/api/delete/' . $celebrity->id);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('celebrities', ['id' => $celebrity->id]);
    }
}
