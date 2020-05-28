<?php

use App\Rules\OldPassword;
use Illuminate\Support\Facades\Hash;

it('passes when no old password is given', function () {
    $result = validator([], [
        'old_password' => [new OldPassword('wrongPassword')],
    ])->passes();

    assertTrue($result);
});

it('passes when old password given is correct', function () {
    $result = validator(['old_password' => 'password'], [
        'old_password' => [new OldPassword(Hash::make('password'))],
    ])->passes();

    assertTrue($result);
});

it('fails when old password given is wrong', function () {
    $result = validator(['old_password' => 'password'], [
        'old_password' => [new OldPassword(Hash::make('wrongPassword'))],
    ])->passes();

    assertFalse($result);
});
