<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Hash;

class OldPassword implements Rule
{
    /**
     * The hashed password to check against.
     *
     * @var string|null
     */
    protected $oldPassword;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($oldPassword)
    {
        $this->oldPassword = $oldPassword;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if ($this->oldPassword === null) {
            return true;
        }

        return Hash::check($value, $this->oldPassword);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The :attribute is incorrect.';
    }
}
