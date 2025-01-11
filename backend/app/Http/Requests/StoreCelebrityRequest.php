<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCelebrityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|max:50",
            "net_worth" => "nullable|numeric",
            "gender" => "nullable|string|max:10",
            "nationality" => "nullable|string|max:50",
            "height" => "nullable|numeric",
            "birthday" => "nullable|date",
            "age" => "nullable|numeric",
            "is_alive" => "nullable|boolean"
        ];
    }
}
