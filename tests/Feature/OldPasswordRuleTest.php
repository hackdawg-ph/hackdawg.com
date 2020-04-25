<?php

namespace Tests\Feature;

use App\Rules\OldPassword;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class OldPasswordRuleTest extends TestCase
{
    /** @test */
    public function it_passes_when_no_old_password_is_given()
    {
        $result = validator([], [
            'old_password' => [new OldPassword('wrongpassword')],
        ])->passes();

        $this->assertTrue($result);
    }

    /** @test */
    public function it_passes_when_old_password_given_is_correct()
    {
        $result = validator(['old_password' => 'password'], [
            'old_password' => [new OldPassword(Hash::make('password'))],
        ])->passes();

        $this->assertTrue($result);
    }

    /** @test */
    public function it_fails_when_old_password_given_is_wrong()
    {
        $result = validator(['old_password' => 'password'], [
            'old_password' => [new OldPassword(Hash::make('wrongpassword'))],
        ])->passes();

        $this->assertFalse($result);
    }
}
