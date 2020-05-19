#!/usr/bin/env php
<?php

$finder = Symfony\Component\Finder\Finder::create()
    ->in(__DIR__)
    ->name('*.php')
    ->notName('*.blade.php')
    ->notPath(['vendor', 'bootstrap', 'storage']);

return PhpCsFixer\Config::create()
    ->setRules([
        '@PSR2' => true,
        'array_syntax' => ['syntax' => 'short'],
        'trailing_comma_in_multiline_array' => true,
        'ordered_imports' => ['sortAlgorithm' => 'alpha'],
        'no_unused_imports' => true,
    ])
    ->setFinder($finder);
