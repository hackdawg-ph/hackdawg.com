<?php


namespace App\Slate;

// TODO: Create a test
class Slate
{
    public function serialize(array $nodeList)
    {
        return collect($nodeList)
            ->map(function ($node) {
                if (optional($node)->type === 'heading-one') {
                    return '<h1>' . $this->renderBlock($node) . '</h1>';
                }

                if (optional($node)->type === 'heading-two') {
                    return '<h2>' . $this->renderBlock($node) . '</h2>';
                }

                if (optional($node)->type === 'block-quote') {
                    return '<blockquote>' . $this->renderBlock($node) . '</blockquote>';
                }

                if (optional($node)->type === 'bulleted-list') {
                    return '<ul>' . $this->renderListItem($node) . '</ul>';
                }

                if (optional($node)->type === 'numbered-list') {
                    return '<ol>' . $this->renderListItem($node) . '</ol>';
                }

                return '<p>' . $this->renderBlock($node) . '</p>';
            })
            ->reduce(fn ($carry, $item) => $carry . PHP_EOL . $item);
    }

    public function renderListItem($node): string
    {
        return collect($node->children)
            ->map(fn ($node) => '<li>' . $this->renderBlock($node) . '</li>')
            ->reduce(fn ($carry, $item) => $carry . $item);
    }

    public function renderBlock($node): string
    {
        return collect($node->children)
            ->map(function ($node) {
                if (optional($node)->bold) {
                    return "<b>{$node->text}</b>";
                }

                if (optional($node)->italic) {
                    return "<i>{$node->text}</i>";
                }

                if (optional($node)->underline) {
                    return "<u>{$node->text}</u>";
                }

                if (optional($node)->code) {
                    return "<code>{$node->text}</code>";
                }

                return $node->text;
            })
            ->reduce(fn ($carry, $item) => $carry . $item);
    }
}
