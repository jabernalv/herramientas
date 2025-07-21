const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/quill-B_GN8A0y.js","assets/_commonjsHelpers-D6-XlEtG.js"])))=>i.map(i=>d[i]);
import{_ as Z}from"./BreadcrumbNav.vue_vue_type_script_setup_true_lang-19izqj3U.js";import{N as _,O as ll,Q as el,R as ol,u as tl,a as p,S as $,F as il,m as rl,h as S,U as I}from"./primevue-DrPXlnFP.js";import{l as nl,_ as al}from"./index-DCzI8z5Q.js";import{c as L,d as O,e as o,v as sl,m as r,y as ql,z as dl,P as cl,r as b,L as V,o as pl,x as a,B as g,R as s,l as k,t as D,j as ul,h as bl}from"./vue-vendor-D8N656sj.js";import{h as fl}from"./html2pdf-Ba0TXtCV.js";import"./_commonjsHelpers-D6-XlEtG.js";var ml=_`
    /*!
* Quill Editor v1.3.3
* https://quilljs.com/
* Copyright (c) 2014, Jason Chen
* Copyright (c) 2013, salesforce.com
*/
    .ql-container {
        box-sizing: border-box;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        height: 100%;
        margin: 0;
        position: relative;
    }
    .ql-container.ql-disabled .ql-tooltip {
        visibility: hidden;
    }
    .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
        pointer-events: none;
    }
    .ql-clipboard {
        inset-inline-start: -100000px;
        height: 1px;
        overflow-y: hidden;
        position: absolute;
        top: 50%;
    }
    .ql-clipboard p {
        margin: 0;
        padding: 0;
    }
    .ql-editor {
        box-sizing: border-box;
        line-height: 1.42;
        height: 100%;
        outline: none;
        overflow-y: auto;
        padding: 12px 15px;
        tab-size: 4;
        -moz-tab-size: 4;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .ql-editor > * {
        cursor: text;
    }
    .ql-editor p,
    .ql-editor ol,
    .ql-editor ul,
    .ql-editor pre,
    .ql-editor blockquote,
    .ql-editor h1,
    .ql-editor h2,
    .ql-editor h3,
    .ql-editor h4,
    .ql-editor h5,
    .ql-editor h6 {
        margin: 0;
        padding: 0;
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol,
    .ql-editor ul {
        padding-inline-start: 1.5rem;
    }
    .ql-editor ol > li,
    .ql-editor ul > li {
        list-style-type: none;
    }
    .ql-editor ul > li::before {
        content: '\\2022';
    }
    .ql-editor ul[data-checked='true'],
    .ql-editor ul[data-checked='false'] {
        pointer-events: none;
    }
    .ql-editor ul[data-checked='true'] > li *,
    .ql-editor ul[data-checked='false'] > li * {
        pointer-events: all;
    }
    .ql-editor ul[data-checked='true'] > li::before,
    .ql-editor ul[data-checked='false'] > li::before {
        color: #777;
        cursor: pointer;
        pointer-events: all;
    }
    .ql-editor ul[data-checked='true'] > li::before {
        content: '\\2611';
    }
    .ql-editor ul[data-checked='false'] > li::before {
        content: '\\2610';
    }
    .ql-editor li::before {
        display: inline-block;
        white-space: nowrap;
        width: 1.2rem;
    }
    .ql-editor li:not(.ql-direction-rtl)::before {
        margin-inline-start: -1.5rem;
        margin-inline-end: 0.3rem;
        text-align: right;
    }
    .ql-editor li.ql-direction-rtl::before {
        margin-inline-start: 0.3rem;
        margin-inline-end: -1.5rem;
    }
    .ql-editor ol li:not(.ql-direction-rtl),
    .ql-editor ul li:not(.ql-direction-rtl) {
        padding-inline-start: 1.5rem;
    }
    .ql-editor ol li.ql-direction-rtl,
    .ql-editor ul li.ql-direction-rtl {
        padding-inline-end: 1.5rem;
    }
    .ql-editor ol li {
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
        counter-increment: list-0;
    }
    .ql-editor ol li:before {
        content: counter(list-0, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-1 {
        counter-increment: list-1;
    }
    .ql-editor ol li.ql-indent-1:before {
        content: counter(list-1, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-1 {
        counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-2 {
        counter-increment: list-2;
    }
    .ql-editor ol li.ql-indent-2:before {
        content: counter(list-2, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-2 {
        counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-3 {
        counter-increment: list-3;
    }
    .ql-editor ol li.ql-indent-3:before {
        content: counter(list-3, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-3 {
        counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-4 {
        counter-increment: list-4;
    }
    .ql-editor ol li.ql-indent-4:before {
        content: counter(list-4, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-4 {
        counter-reset: list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-5 {
        counter-increment: list-5;
    }
    .ql-editor ol li.ql-indent-5:before {
        content: counter(list-5, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-5 {
        counter-reset: list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-6 {
        counter-increment: list-6;
    }
    .ql-editor ol li.ql-indent-6:before {
        content: counter(list-6, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-6 {
        counter-reset: list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-7 {
        counter-increment: list-7;
    }
    .ql-editor ol li.ql-indent-7:before {
        content: counter(list-7, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-7 {
        counter-reset: list-8 list-9;
    }
    .ql-editor ol li.ql-indent-8 {
        counter-increment: list-8;
    }
    .ql-editor ol li.ql-indent-8:before {
        content: counter(list-8, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-8 {
        counter-reset: list-9;
    }
    .ql-editor ol li.ql-indent-9 {
        counter-increment: list-9;
    }
    .ql-editor ol li.ql-indent-9:before {
        content: counter(list-9, decimal) '. ';
    }
    .ql-editor .ql-video {
        display: block;
        max-width: 100%;
    }
    .ql-editor .ql-video.ql-align-center {
        margin: 0 auto;
    }
    .ql-editor .ql-video.ql-align-right {
        margin: 0 0 0 auto;
    }
    .ql-editor .ql-bg-black {
        background: #000;
    }
    .ql-editor .ql-bg-red {
        background: #e60000;
    }
    .ql-editor .ql-bg-orange {
        background: #f90;
    }
    .ql-editor .ql-bg-yellow {
        background: #ff0;
    }
    .ql-editor .ql-bg-green {
        background: #008a00;
    }
    .ql-editor .ql-bg-blue {
        background: #06c;
    }
    .ql-editor .ql-bg-purple {
        background: #93f;
    }
    .ql-editor .ql-color-white {
        color: #fff;
    }
    .ql-editor .ql-color-red {
        color: #e60000;
    }
    .ql-editor .ql-color-orange {
        color: #f90;
    }
    .ql-editor .ql-color-yellow {
        color: #ff0;
    }
    .ql-editor .ql-color-green {
        color: #008a00;
    }
    .ql-editor .ql-color-blue {
        color: #06c;
    }
    .ql-editor .ql-color-purple {
        color: #93f;
    }
    .ql-editor .ql-font-serif {
        font-family:
            Georgia,
            Times New Roman,
            serif;
    }
    .ql-editor .ql-font-monospace {
        font-family:
            Monaco,
            Courier New,
            monospace;
    }
    .ql-editor .ql-size-small {
        font-size: 0.75rem;
    }
    .ql-editor .ql-size-large {
        font-size: 1.5rem;
    }
    .ql-editor .ql-size-huge {
        font-size: 2.5rem;
    }
    .ql-editor .ql-direction-rtl {
        direction: rtl;
        text-align: inherit;
    }
    .ql-editor .ql-align-center {
        text-align: center;
    }
    .ql-editor .ql-align-justify {
        text-align: justify;
    }
    .ql-editor .ql-align-right {
        text-align: right;
    }
    .ql-editor.ql-blank::before {
        color: rgba(0, 0, 0, 0.6);
        content: attr(data-placeholder);
        font-style: italic;
        inset-inline-start: 15px;
        pointer-events: none;
        position: absolute;
        inset-inline-end: 15px;
    }
    .ql-snow.ql-toolbar:after,
    .ql-snow .ql-toolbar:after {
        clear: both;
        content: '';
        display: table;
    }
    .ql-snow.ql-toolbar button,
    .ql-snow .ql-toolbar button {
        background: none;
        border: none;
        cursor: pointer;
        display: inline-block;
        float: left;
        height: 24px;
        padding-block: 3px;
        padding-inline: 5px;
        width: 28px;
    }
    .ql-snow.ql-toolbar button svg,
    .ql-snow .ql-toolbar button svg {
        float: left;
        height: 100%;
    }
    .ql-snow.ql-toolbar button:active:hover,
    .ql-snow .ql-toolbar button:active:hover {
        outline: none;
    }
    .ql-snow.ql-toolbar input.ql-image[type='file'],
    .ql-snow .ql-toolbar input.ql-image[type='file'] {
        display: none;
    }
    .ql-snow.ql-toolbar button:hover,
    .ql-snow .ql-toolbar button:hover,
    .ql-snow.ql-toolbar button:focus,
    .ql-snow .ql-toolbar button:focus,
    .ql-snow.ql-toolbar button.ql-active,
    .ql-snow .ql-toolbar button.ql-active,
    .ql-snow.ql-toolbar .ql-picker-label:hover,
    .ql-snow .ql-toolbar .ql-picker-label:hover,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active,
    .ql-snow.ql-toolbar .ql-picker-item:hover,
    .ql-snow .ql-toolbar .ql-picker-item:hover,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
        color: #06c;
    }
    .ql-snow.ql-toolbar button:hover .ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
        fill: #06c;
    }
    .ql-snow.ql-toolbar button:hover .ql-stroke,
    .ql-snow .ql-toolbar button:hover .ql-stroke,
    .ql-snow.ql-toolbar button:focus .ql-stroke,
    .ql-snow .ql-toolbar button:focus .ql-stroke,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
        stroke: #06c;
    }
    @media (pointer: coarse) {
        .ql-snow.ql-toolbar button:hover:not(.ql-active),
        .ql-snow .ql-toolbar button:hover:not(.ql-active) {
            color: #444;
        }
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
            fill: #444;
        }
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
            stroke: #444;
        }
    }
    .ql-snow {
        box-sizing: border-box;
    }
    .ql-snow * {
        box-sizing: border-box;
    }
    .ql-snow .ql-hidden {
        display: none;
    }
    .ql-snow .ql-out-bottom,
    .ql-snow .ql-out-top {
        visibility: hidden;
    }
    .ql-snow .ql-tooltip {
        position: absolute;
        transform: translateY(10px);
    }
    .ql-snow .ql-tooltip a {
        cursor: pointer;
        text-decoration: none;
    }
    .ql-snow .ql-tooltip.ql-flip {
        transform: translateY(-10px);
    }
    .ql-snow .ql-formats {
        display: inline-block;
        vertical-align: middle;
    }
    .ql-snow .ql-formats:after {
        clear: both;
        content: '';
        display: table;
    }
    .ql-snow .ql-stroke {
        fill: none;
        stroke: #444;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
    }
    .ql-snow .ql-stroke-miter {
        fill: none;
        stroke: #444;
        stroke-miterlimit: 10;
        stroke-width: 2;
    }
    .ql-snow .ql-fill,
    .ql-snow .ql-stroke.ql-fill {
        fill: #444;
    }
    .ql-snow .ql-empty {
        fill: none;
    }
    .ql-snow .ql-even {
        fill-rule: evenodd;
    }
    .ql-snow .ql-thin,
    .ql-snow .ql-stroke.ql-thin {
        stroke-width: 1;
    }
    .ql-snow .ql-transparent {
        opacity: 0.4;
    }
    .ql-snow .ql-direction svg:last-child {
        display: none;
    }
    .ql-snow .ql-direction.ql-active svg:last-child {
        display: inline;
    }
    .ql-snow .ql-direction.ql-active svg:first-child {
        display: none;
    }
    .ql-snow .ql-editor h1 {
        font-size: 2rem;
    }
    .ql-snow .ql-editor h2 {
        font-size: 1.5rem;
    }
    .ql-snow .ql-editor h3 {
        font-size: 1.17rem;
    }
    .ql-snow .ql-editor h4 {
        font-size: 1rem;
    }
    .ql-snow .ql-editor h5 {
        font-size: 0.83rem;
    }
    .ql-snow .ql-editor h6 {
        font-size: 0.67rem;
    }
    .ql-snow .ql-editor a {
        text-decoration: underline;
    }
    .ql-snow .ql-editor blockquote {
        border-inline-start: 4px solid #ccc;
        margin-block-end: 5px;
        margin-block-start: 5px;
        padding-inline-start: 16px;
    }
    .ql-snow .ql-editor code,
    .ql-snow .ql-editor pre {
        background: #f0f0f0;
        border-radius: 3px;
    }
    .ql-snow .ql-editor pre {
        white-space: pre-wrap;
        margin-block-end: 5px;
        margin-block-start: 5px;
        padding: 5px 10px;
    }
    .ql-snow .ql-editor code {
        font-size: 85%;
        padding: 2px 4px;
    }
    .ql-snow .ql-editor pre.ql-syntax {
        background: #23241f;
        color: #f8f8f2;
        overflow: visible;
    }
    .ql-snow .ql-editor img {
        max-width: 100%;
    }
    .ql-snow .ql-picker {
        color: #444;
        display: inline-block;
        float: left;
        inset-inline-start: 0;
        font-size: 14px;
        font-weight: 500;
        height: 24px;
        position: relative;
        vertical-align: middle;
    }
    .ql-snow .ql-picker-label {
        cursor: pointer;
        display: inline-block;
        height: 100%;
        padding-inline-start: 8px;
        padding-inline-end: 2px;
        position: relative;
        width: 100%;
    }
    .ql-snow .ql-picker-label::before {
        display: inline-block;
        line-height: 22px;
    }
    .ql-snow .ql-picker-options {
        background: #fff;
        display: none;
        min-width: 100%;
        padding: 4px 8px;
        position: absolute;
        white-space: nowrap;
    }
    .ql-snow .ql-picker-options .ql-picker-item {
        cursor: pointer;
        display: block;
        padding-block-end: 5px;
        padding-block-start: 5px;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-label {
        color: #ccc;
        z-index: 2;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
        fill: #ccc;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
        stroke: #ccc;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-options {
        display: block;
        margin-block-start: -1px;
        top: 100%;
        z-index: 1;
    }
    .ql-snow .ql-color-picker,
    .ql-snow .ql-icon-picker {
        width: 28px;
    }
    .ql-snow .ql-color-picker .ql-picker-label,
    .ql-snow .ql-icon-picker .ql-picker-label {
        padding: 2px 4px;
    }
    .ql-snow .ql-color-picker .ql-picker-label svg,
    .ql-snow .ql-icon-picker .ql-picker-label svg {
        inset-inline-end: 4px;
    }
    .ql-snow .ql-icon-picker .ql-picker-options {
        padding: 4px 0;
    }
    .ql-snow .ql-icon-picker .ql-picker-item {
        height: 24px;
        width: 24px;
        padding: 2px 4px;
    }
    .ql-snow .ql-color-picker .ql-picker-options {
        padding: 3px 5px;
        width: 152px;
    }
    .ql-snow .ql-color-picker .ql-picker-item {
        border: 1px solid transparent;
        float: left;
        height: 16px;
        margin: 2px;
        padding: 0;
        width: 16px;
    }
    .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
        position: absolute;
        margin-block-start: -9px;
        inset-inline-end: 0;
        top: 50%;
        width: 18px;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {
        content: attr(data-label);
    }
    .ql-snow .ql-picker.ql-header {
        width: 98px;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: 'Normal';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
        content: 'Heading 1';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
        content: 'Heading 2';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
        content: 'Heading 3';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
        content: 'Heading 4';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
        content: 'Heading 5';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
        content: 'Heading 6';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
        font-size: 2rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
        font-size: 1.5rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
        font-size: 1.17rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
        font-size: 1rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
        font-size: 0.83rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
        font-size: 0.67rem;
    }
    .ql-snow .ql-picker.ql-font {
        width: 108px;
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: 'Sans Serif';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
        content: 'Serif';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
        content: 'Monospace';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
        font-family:
            Georgia,
            Times New Roman,
            serif;
    }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
        font-family:
            Monaco,
            Courier New,
            monospace;
    }
    .ql-snow .ql-picker.ql-size {
        width: 98px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: 'Normal';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
        content: 'Small';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
        content: 'Large';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
        content: 'Huge';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
        font-size: 10px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
        font-size: 18px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
        font-size: 32px;
    }
    .ql-snow .ql-color-picker.ql-background .ql-picker-item {
        background: #fff;
    }
    .ql-snow .ql-color-picker.ql-color .ql-picker-item {
        background: #000;
    }
    .ql-toolbar.ql-snow {
        border: 1px solid #ccc;
        box-sizing: border-box;
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        padding: 8px;
    }
    .ql-toolbar.ql-snow .ql-formats {
        margin-inline-end: 15px;
    }
    .ql-toolbar.ql-snow .ql-picker-label {
        border: 1px solid transparent;
    }
    .ql-toolbar.ql-snow .ql-picker-options {
        border: 1px solid transparent;
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;
    }
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
        border-color: #ccc;
    }
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
        border-color: #ccc;
    }
    .ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,
    .ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover {
        border-color: #000;
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
        border-block-start: 0;
    }
    .ql-snow .ql-tooltip {
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 0 5px #ddd;
        color: #444;
        padding: 5px 12px;
        white-space: nowrap;
    }
    .ql-snow .ql-tooltip::before {
        content: 'Visit URL:';
        line-height: 26px;
        margin-inline-end: 8px;
    }
    .ql-snow .ql-tooltip input[type='text'] {
        display: none;
        border: 1px solid #ccc;
        font-size: 13px;
        height: 26px;
        margin: 0;
        padding: 3px 5px;
        width: 170px;
    }
    .ql-snow .ql-tooltip a.ql-preview {
        display: inline-block;
        max-width: 200px;
        overflow-x: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
    }
    .ql-snow .ql-tooltip a.ql-action::after {
        border-inline-end: 1px solid #ccc;
        content: 'Edit';
        margin-inline-start: 16px;
        padding-inline-end: 8px;
    }
    .ql-snow .ql-tooltip a.ql-remove::before {
        content: 'Remove';
        margin-inline-start: 8px;
    }
    .ql-snow .ql-tooltip a {
        line-height: 26px;
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-preview,
    .ql-snow .ql-tooltip.ql-editing a.ql-remove {
        display: none;
    }
    .ql-snow .ql-tooltip.ql-editing input[type='text'] {
        display: inline-block;
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-inline-end: 0;
        content: 'Save';
        padding-inline-end: 0;
    }
    .ql-snow .ql-tooltip[data-mode='link']::before {
        content: 'Enter link:';
    }
    .ql-snow .ql-tooltip[data-mode='formula']::before {
        content: 'Enter formula:';
    }
    .ql-snow .ql-tooltip[data-mode='video']::before {
        content: 'Enter video:';
    }
    .ql-snow a {
        color: #06c;
    }
    .ql-container.ql-snow {
        border: 1px solid #ccc;
    }

    .p-editor .p-editor-toolbar {
        background: dt('editor.toolbar.background');
        border-start-end-radius: dt('editor.toolbar.border.radius');
        border-start-start-radius: dt('editor.toolbar.border.radius');
    }

    .p-editor .p-editor-toolbar.ql-snow {
        border: 1px solid dt('editor.toolbar.border.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-stroke {
        stroke: dt('editor.toolbar.item.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-fill {
        fill: dt('editor.toolbar.item.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label {
        border: 0 none;
        color: dt('editor.toolbar.item.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover {
        color: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-stroke {
        stroke: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-fill {
        fill: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
        color: dt('editor.toolbar.item.active.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
        stroke: dt('editor.toolbar.item.active.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
        fill: dt('editor.toolbar.item.active.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
        background: dt('editor.overlay.background');
        border: 1px solid dt('editor.overlay.border.color');
        box-shadow: dt('editor.overlay.shadow');
        border-radius: dt('editor.overlay.border.radius');
        padding: dt('editor.overlay.padding');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item {
        color: dt('editor.overlay.option.color');
        border-radius: dt('editor.overlay.option.border.radius');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item:hover {
        background: dt('editor.overlay.option.focus.background');
        color: dt('editor.overlay.option.focus.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded:not(.ql-icon-picker) .ql-picker-item {
        padding: dt('editor.overlay.option.padding');
    }

    .p-editor .p-editor-content {
        border-end-end-radius: dt('editor.content.border.radius');
        border-end-start-radius: dt('editor.content.border.radius');
    }

    .p-editor .p-editor-content.ql-snow {
        border: 1px solid dt('editor.content.border.color');
    }

    .p-editor .p-editor-content .ql-editor {
        background: dt('editor.content.background');
        color: dt('editor.content.color');
        border-end-end-radius: dt('editor.content.border.radius');
        border-end-start-radius: dt('editor.content.border.radius');
    }

    .p-editor .ql-snow.ql-toolbar button:hover,
    .p-editor .ql-snow.ql-toolbar button:focus {
        color: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .ql-snow.ql-toolbar button:hover .ql-stroke,
    .p-editor .ql-snow.ql-toolbar button:focus .ql-stroke {
        stroke: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .ql-snow.ql-toolbar button:hover .ql-fill,
    .p-editor .ql-snow.ql-toolbar button:focus .ql-fill {
        fill: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected {
        color: dt('editor.toolbar.item.active.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
        stroke: dt('editor.toolbar.item.active.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active .ql-fill,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill {
        fill: dt('editor.toolbar.item.active.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active .ql-picker-label,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-picker-label,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-picker-label {
        color: dt('editor.toolbar.item.active.color');
    }
`,kl={root:function(t){var i=t.instance;return["p-editor",{"p-invalid":i.$invalid}]},toolbar:"p-editor-toolbar",content:"p-editor-content"},vl=ll.extend({name:"editor",style:ml,classes:kl}),wl={name:"BaseEditor",extends:el,props:{placeholder:String,readonly:Boolean,formats:Array,editorStyle:null,modules:null},style:vl,provide:function(){return{$pcEditor:this,$parentInstance:this}}};function C(l){"@babel/helpers - typeof";return C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(l)}function U(l,t){var i=Object.keys(l);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(l);t&&(d=d.filter(function(f){return Object.getOwnPropertyDescriptor(l,f).enumerable})),i.push.apply(i,d)}return i}function gl(l){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?U(Object(i),!0).forEach(function(d){hl(l,d,i[d])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(i)):U(Object(i)).forEach(function(d){Object.defineProperty(l,d,Object.getOwnPropertyDescriptor(i,d))})}return l}function hl(l,t,i){return(t=yl(t))in l?Object.defineProperty(l,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):l[t]=i,l}function yl(l){var t=xl(l,"string");return C(t)=="symbol"?t:t+""}function xl(l,t){if(C(l)!="object"||!l)return l;var i=l[Symbol.toPrimitive];if(i!==void 0){var d=i.call(l,t);if(C(d)!="object")return d;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(l)}var H=function(){try{return window.Quill}catch{return null}}(),N={name:"Editor",extends:wl,inheritAttrs:!1,emits:["text-change","selection-change","load"],quill:null,watch:{modelValue:function(t,i){t!==i&&this.quill&&!this.quill.hasFocus()&&this.renderValue(t)},readonly:function(){this.handleReadOnlyChange()}},mounted:function(){var t=this,i={modules:gl({toolbar:this.$refs.toolbarElement},this.modules),readOnly:this.readonly,theme:"snow",formats:this.formats,placeholder:this.placeholder};H?(this.quill=new H(this.$refs.editorElement,i),this.initQuill(),this.handleLoad()):nl(()=>import("./quill-B_GN8A0y.js"),__vite__mapDeps([0,1])).then(function(d){d&&ol(t.$refs.editorElement)&&(d.default?t.quill=new d.default(t.$refs.editorElement,i):t.quill=new d(t.$refs.editorElement,i),t.initQuill())}).then(function(){t.handleLoad()})},beforeUnmount:function(){this.quill=null},methods:{renderValue:function(t){if(this.quill)if(t){var i=this.quill.clipboard.convert({html:t});this.quill.setContents(i)}else this.quill.setText("")},initQuill:function(){var t=this;this.renderValue(this.d_value),this.quill.on("text-change",function(i,d,f){if(f==="user"){var c=t.quill.getSemanticHTML(),m=t.quill.getText().trim();c==="<p><br></p>"&&(c=""),t.writeValue(c),t.$emit("text-change",{htmlValue:c,textValue:m,delta:i,source:f,instance:t.quill})}}),this.quill.on("selection-change",function(i,d,f){var c=t.quill.getSemanticHTML(),m=t.quill.getText().trim();t.$emit("selection-change",{htmlValue:c,textValue:m,range:i,oldRange:d,source:f,instance:t.quill})})},handleLoad:function(){this.quill&&this.quill.getModule("toolbar")&&this.$emit("load",{instance:this.quill})},handleReadOnlyChange:function(){this.quill&&this.quill.enable(!this.readonly)}}};function zl(l,t,i,d,f,c){return O(),L("div",r({class:l.cx("root")},l.ptmi("root")),[o("div",r({ref:"toolbarElement",class:l.cx("toolbar")},l.ptm("toolbar")),[sl(l.$slots,"toolbar",{},function(){return[o("span",r({class:"ql-formats"},l.ptm("formats")),[o("select",r({class:"ql-header",defaultValue:"0"},l.ptm("header")),[o("option",r({value:"1"},l.ptm("option")),"Heading",16),o("option",r({value:"2"},l.ptm("option")),"Subheading",16),o("option",r({value:"0"},l.ptm("option")),"Normal",16)],16),o("select",r({class:"ql-font"},l.ptm("font")),[o("option",ql(dl(l.ptm("option"))),null,16),o("option",r({value:"serif"},l.ptm("option")),null,16),o("option",r({value:"monospace"},l.ptm("option")),null,16)],16)],16),o("span",r({class:"ql-formats"},l.ptm("formats")),[o("button",r({class:"ql-bold",type:"button"},l.ptm("bold")),null,16),o("button",r({class:"ql-italic",type:"button"},l.ptm("italic")),null,16),o("button",r({class:"ql-underline",type:"button"},l.ptm("underline")),null,16)],16),o("span",r({class:"ql-formats"},l.ptm("formats")),[o("select",r({class:"ql-color"},l.ptm("color")),null,16),o("select",r({class:"ql-background"},l.ptm("background")),null,16)],16),o("span",r({class:"ql-formats"},l.ptm("formats")),[o("button",r({class:"ql-list",value:"ordered",type:"button"},l.ptm("list")),null,16),o("button",r({class:"ql-list",value:"bullet",type:"button"},l.ptm("list")),null,16),o("select",r({class:"ql-align"},l.ptm("select")),[o("option",r({defaultValue:""},l.ptm("option")),null,16),o("option",r({value:"center"},l.ptm("option")),null,16),o("option",r({value:"right"},l.ptm("option")),null,16),o("option",r({value:"justify"},l.ptm("option")),null,16)],16)],16),o("span",r({class:"ql-formats"},l.ptm("formats")),[o("button",r({class:"ql-link",type:"button"},l.ptm("link")),null,16),o("button",r({class:"ql-image",type:"button"},l.ptm("image")),null,16),o("button",r({class:"ql-code-block",type:"button"},l.ptm("codeBlock")),null,16)],16),o("span",r({class:"ql-formats"},l.ptm("formats")),[o("button",r({class:"ql-clean",type:"button"},l.ptm("clean")),null,16)],16)]})],16),o("div",r({ref:"editorElement",class:l.cx("content"),style:l.editorStyle},l.ptm("content")),null,16)],16)}N.render=zl;const Cl={class:"min-h-screen flex flex-col"},Sl={class:"flex-grow flex justify-center w-full md:w-4/5 mx-auto"},El={class:"space-y-6"},Pl={class:"flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border"},$l={class:"border rounded-lg"},Vl={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},Dl={class:"bg-blue-50 p-4 rounded-lg"},Ll={class:"text-lg font-bold text-blue-600"},Ol={class:"bg-green-50 p-4 rounded-lg"},jl={class:"text-lg font-bold text-green-600"},Rl={class:"bg-purple-50 p-4 rounded-lg"},Tl={class:"text-lg font-bold text-purple-600"},Il={class:"space-y-4"},Ul={class:"flex justify-between items-center"},Hl=["innerHTML"],Nl={class:"space-y-4"},Fl={class:"space-y-4"},Ml={class:"text-center"},Ql=cl({__name:"RichEditor",setup(l){const t=tl(),i=b(),d=b(),f=b(),c=b(""),m=b(!1),E=b(!1),x=b(!1),z=b(!1),h=b(""),y=b(""),w=b(""),P=b(""),F={toolbar:[[{header:[1,2,3,!1]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],["link","image"],["clean"]],clipboard:{matchVisual:!1}},j=V(()=>{if(!c.value)return 0;const n=c.value.replace(/<[^>]*>/g,"").trim();return n?n.split(/\s+/).length:0}),R=V(()=>c.value?c.value.replace(/<[^>]*>/g,"").length:0),M=V(()=>c.value?c.value.replace(/<[^>]*>/g,"").replace(/\s/g,"").length:0),v=n=>{if(i.value){const e=i.value.getQuill();e.getSelection()&&(n==="bold"?e.format("bold",!e.getFormat().bold):n==="italic"?e.format("italic",!e.getFormat().italic):n==="underline"?e.format("underline",!e.getFormat().underline):n==="insertOrderedList"?e.format("list","ordered"):n==="insertUnorderedList"&&e.format("list","bullet"))}},Q=()=>{h.value="",y.value="",x.value=!0},A=()=>{if(i.value&&h.value&&y.value){const n=i.value.getQuill(),e=n.getSelection();e&&n.insertText(e.index,h.value,"link",y.value)}x.value=!1},B=()=>{w.value="",P.value="",z.value=!0},K=()=>{if(i.value&&w.value){const n=i.value.getQuill(),e=n.getSelection();e&&n.insertEmbed(e.index,"image",w.value)}z.value=!1},G=n=>{const u=n.target.files?.[0];if(u){const q=new FileReader;q.onload=X=>{w.value=X.target?.result},q.readAsDataURL(u)}},J=()=>{c.value="",t.add({severity:"success",summary:"Limpieza exitosa",detail:"Contenido limpiado correctamente",life:2e3})},W=()=>{m.value=!m.value},Y=()=>{},T=async()=>{if(!c.value.trim()){t.add({severity:"warn",summary:"Advertencia",detail:"Por favor escribe algún contenido antes de exportar",life:3e3});return}E.value=!0;try{const n=document.createElement("div");n.innerHTML=`
      <div style="padding: 40px; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4f46e5; padding-bottom: 20px;">
          <h1 style="color: #4f46e5; margin: 0; font-size: 28px;">Documento</h1>
          <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Generado el ${new Date().toLocaleDateString("es-ES")}</p>
        </div>
        <div style="font-size: 16px;">
          ${c.value}
        </div>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #666;">
          <p>Documento generado con Editor Rico de Texto</p>
          <p>Palabras: ${j.value} | Caracteres: ${R.value}</p>
        </div>
      </div>
    `;const e={margin:1,filename:`documento_${new Date().toISOString().split("T")[0]}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0,allowTaint:!0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}};await fl().set(e).from(n).save(),t.add({severity:"success",summary:"PDF generado",detail:"El documento se ha descargado correctamente",life:3e3})}catch(n){console.error("Error al generar PDF:",n),t.add({severity:"error",summary:"Error",detail:"No se pudo generar el PDF",life:3e3})}finally{E.value=!1}};return pl(()=>{document.addEventListener("keydown",n=>{if(n.ctrlKey||n.metaKey)switch(n.key){case"b":n.preventDefault(),v("bold");break;case"i":n.preventDefault(),v("italic");break;case"u":n.preventDefault(),v("underline");break;case"s":n.preventDefault(),T();break}})}),(n,e)=>{const u=bl("tooltip");return O(),L("div",Cl,[a(Z),o("div",Sl,[a(s(rl),{class:"bg-white p-8 rounded-2xl shadow-2xl w-full"},{title:g(()=>e[15]||(e[15]=[o("h1",{class:"mb-3 text-center text-gray-800 text-[0.65rem] sm:text-sm md:text-xl"}," 📝 Editor Rico de Texto ",-1)])),content:g(()=>[o("div",El,[o("div",Pl,[k(a(s(p),{onClick:e[0]||(e[0]=q=>v("bold")),severity:"secondary",size:"small",icon:"pi pi-bold"},null,512),[[u,"Negrita (Ctrl+B)"]]),k(a(s(p),{onClick:e[1]||(e[1]=q=>v("italic")),severity:"secondary",size:"small",icon:"pi pi-italic"},null,512),[[u,"Cursiva (Ctrl+I)"]]),k(a(s(p),{onClick:e[2]||(e[2]=q=>v("underline")),severity:"secondary",size:"small",icon:"pi pi-underline"},null,512),[[u,"Subrayado (Ctrl+U)"]]),a(s($),{layout:"vertical"}),k(a(s(p),{onClick:e[3]||(e[3]=q=>v("insertOrderedList")),severity:"secondary",size:"small",icon:"pi pi-list"},null,512),[[u,"Lista numerada"]]),k(a(s(p),{onClick:e[4]||(e[4]=q=>v("insertUnorderedList")),severity:"secondary",size:"small",icon:"pi pi-circle"},null,512),[[u,"Lista con viñetas"]]),a(s($),{layout:"vertical"}),k(a(s(p),{onClick:Q,severity:"secondary",size:"small",icon:"pi pi-link"},null,512),[[u,"Insertar enlace"]]),k(a(s(p),{onClick:B,severity:"secondary",size:"small",icon:"pi pi-image"},null,512),[[u,"Insertar imagen"]]),a(s($),{layout:"vertical"}),k(a(s(p),{onClick:J,severity:"danger",size:"small",icon:"pi pi-trash",label:"Limpiar"},null,512),[[u,"Limpiar todo el contenido"]]),k(a(s(p),{onClick:T,severity:"success",size:"small",icon:"pi pi-download",label:"Descargar PDF",loading:E.value},null,8,["loading"]),[[u,"Exportar como PDF"]])]),o("div",$l,[a(s(N),{modelValue:c.value,"onUpdate:modelValue":e[5]||(e[5]=q=>c.value=q),ref_key:"editorRef",ref:i,modules:F,style:{height:"500px"},placeholder:"Escribe tu documento aquí...",onTextChange:Y},null,8,["modelValue"])]),o("div",Vl,[o("div",Dl,[o("div",Ll,D(j.value),1),e[16]||(e[16]=o("div",{class:"text-sm text-blue-500"},"Palabras",-1))]),o("div",Ol,[o("div",jl,D(R.value),1),e[17]||(e[17]=o("div",{class:"text-sm text-green-500"},"Caracteres",-1))]),o("div",Rl,[o("div",Tl,D(M.value),1),e[18]||(e[18]=o("div",{class:"text-sm text-purple-500"},"Sin espacios",-1))])]),o("div",Il,[o("div",Ul,[e[19]||(e[19]=o("h3",{class:"text-lg font-semibold text-gray-700"}," Vista Previa del Documento ",-1)),a(s(p),{onClick:W,label:m.value?"Ocultar Vista Previa":"Mostrar Vista Previa",severity:"secondary",size:"small",icon:m.value?"pi pi-eye-slash":"pi pi-eye"},null,8,["label","icon"])]),m.value?(O(),L("div",{key:0,class:"border rounded-lg p-6 bg-white",ref_key:"previewRef",ref:d},[o("div",{class:"prose max-w-none",innerHTML:c.value},null,8,Hl)],512)):ul("",!0)]),a(s(il),{severity:"info"},{default:g(()=>e[20]||(e[20]=[o("p",null,[o("strong",null,"💡 Sobre esta herramienta:")],-1),o("p",{class:"mt-1"}," Editor de texto rico con formato completo, similar a Microsoft Word. Incluye herramientas de formato, inserción de enlaces e imágenes, y capacidad de exportar directamente a PDF. Perfecto para crear documentos rápidos y profesionales. ",-1)])),_:1,__:[20]})])]),_:1})]),a(s(I),{visible:x.value,"onUpdate:visible":e[9]||(e[9]=q=>x.value=q),modal:"",header:"Insertar Enlace",style:{width:"450px"}},{footer:g(()=>[a(s(p),{label:"Cancelar",severity:"secondary",onClick:e[8]||(e[8]=q=>x.value=!1)}),a(s(p),{label:"Insertar",onClick:A,disabled:!h.value||!y.value},null,8,["disabled"])]),default:g(()=>[o("div",Nl,[o("div",null,[e[21]||(e[21]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"Texto del enlace",-1)),a(s(S),{modelValue:h.value,"onUpdate:modelValue":e[6]||(e[6]=q=>h.value=q),placeholder:"Texto a mostrar",class:"w-full"},null,8,["modelValue"])]),o("div",null,[e[22]||(e[22]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"URL",-1)),a(s(S),{modelValue:y.value,"onUpdate:modelValue":e[7]||(e[7]=q=>y.value=q),placeholder:"https://...",class:"w-full"},null,8,["modelValue"])])])]),_:1},8,["visible"]),a(s(I),{visible:z.value,"onUpdate:visible":e[14]||(e[14]=q=>z.value=q),modal:"",header:"Insertar Imagen",style:{width:"450px"}},{footer:g(()=>[a(s(p),{label:"Cancelar",severity:"secondary",onClick:e[13]||(e[13]=q=>z.value=!1)}),a(s(p),{label:"Insertar",onClick:K,disabled:!w.value},null,8,["disabled"])]),default:g(()=>[o("div",Fl,[o("div",null,[e[23]||(e[23]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"URL de la imagen",-1)),a(s(S),{modelValue:w.value,"onUpdate:modelValue":e[10]||(e[10]=q=>w.value=q),placeholder:"https://...",class:"w-full"},null,8,["modelValue"])]),o("div",null,[e[24]||(e[24]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"Texto alternativo",-1)),a(s(S),{modelValue:P.value,"onUpdate:modelValue":e[11]||(e[11]=q=>P.value=q),placeholder:"Descripción de la imagen",class:"w-full"},null,8,["modelValue"])]),o("div",Ml,[e[25]||(e[25]=o("p",{class:"text-sm text-gray-500"},"O",-1)),o("input",{ref_key:"fileInput",ref:f,type:"file",accept:"image/*",onChange:G,class:"hidden"},null,544),a(s(p),{label:"Subir imagen desde archivo",severity:"secondary",onClick:e[12]||(e[12]=q=>f.value.click()),icon:"pi pi-upload"})])])]),_:1},8,["visible"])])}}}),Yl=al(Ql,[["__scopeId","data-v-66889731"]]);export{Yl as default};
