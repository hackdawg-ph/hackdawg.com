import React, { useCallback, useMemo, useState } from 'react';
import { Editor, Transforms, createEditor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import isHotkey from 'is-hotkey';
import Icon from '@/backend/Shared/Editor/Icon';
import Button from '@/backend/Shared/Editor/Button';
import Element from '@/backend/Shared/Editor/Element';
import Leaf from '@/backend/Shared/Editor/Leaf';
import PropTypes from 'prop-types';

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export default function HackdawgEditor() {
    const [value, setValue] = useState(initialValue);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const editor = useMemo(() => withReact(createEditor()), []);

    return (
        <div className="w-1/2 bg-white relative rounded-md shadow-sm">
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <div className="flex items-center border-b p-5">
                    <MarkButton format="bold" icon="format_bold" />
                    <MarkButton format="italic" icon="format_italic" />
                    <MarkButton format="underline" icon="format_underlined" />
                    <MarkButton format="code" icon="code" />
                    <BlockButton format="heading-one" icon="looks_one" />
                    <BlockButton format="heading-two" icon="looks_two" />
                    <BlockButton format="block-quote" icon="quote" />
                    <BlockButton format="numbered-list" icon="format_list_numbered" />
                    <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                </div>
                <div className="p-5">
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey];
                                    toggleMark(editor, mark);
                                }
                            }
                        }}
                    />
                </div>
            </Slate>
        </div>
    );
}

MarkButton.propTypes = {
    format: PropTypes.oneOf(['bold', 'italic', 'underline', 'code']),
    icon: PropTypes.string,
};

function MarkButton({ format, icon }) {
    const editor = useSlate();

    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon name={icon} />
        </Button>
    );
}

BlockButton.propTypes = {
    format: PropTypes.oneOf(['heading-one', 'heading-two', 'block-quote', 'numbered-list', 'bulleted-list']),
    icon: PropTypes.string,
};

function BlockButton({ format, icon }) {
    const editor = useSlate();

    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <Icon name={icon} />
        </Button>
    );
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true,
    });

    Transforms.setNodes(editor, {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    });

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
    });

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];
