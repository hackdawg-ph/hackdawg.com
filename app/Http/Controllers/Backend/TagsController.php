<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Inertia\Inertia;

class TagsController extends Controller
{
    /**
     * Show a listing of tags.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Tags/List', [
            'tags' => Tag::paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new tag.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Tags/Create');
    }

    /**
     * Store a newly created tag in storage.
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store()
    {
        Tag::create($this->validateTag());

        return redirect()->route('backend.tags.index')->with('message', [
            'title' => 'Success!',
            'body' => 'Tag created.',
            'variant' => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified tag.
     *
     * @param  \App\Models\Tag tag
     * @return \Inertia\Response
     */
    public function edit(Tag $tag)
    {
        return Inertia::render('Tags/Edit', compact('tag'));
    }

    /**
     * Update the specified tag in storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Tag $tag)
    {
        $tag->update($this->validateTag($tag));

        return redirect()->route('backend.tags.index')->with('message', [
            'title' => 'Success!',
            'body' => 'Tag details updated.',
            'variant' => 'success',
        ]);
    }

    /**
     * Remove the specified tag from storage.
     *
     * @param \App\Models\Tag $tag
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     *
     * @throws \Exception
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();

        return back()->with('message', [
            'title' => 'Success!',
            'body' => 'Tag deleted.',
            'variant' => 'success',
        ]);
    }

    protected function validateTag($tag = null)
    {
        return request()->validate([
            'name' => 'required|unique:tags,name,' . optional($tag)->id,
            'description' => '',
        ]);
    }
}
