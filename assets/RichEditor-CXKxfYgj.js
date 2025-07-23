const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/quill-B_GN8A0y.js","assets/_commonjsHelpers-D6-XlEtG.js"])))=>i.map(i=>d[i]);
import{_ as rl}from"./BreadcrumbNav.vue_vue_type_script_setup_true_lang-CrpDvC1M.js";import{N as nl,O as al,Q as sl,R as ql,u as dl,a as p,S as D,F as cl,m as pl,h as E,U}from"./primevue-DrPXlnFP.js";import{l as ul,_ as bl}from"./index-BYHs7J-Q.js";import{c as P,d as $,e as o,v as fl,m as n,y as ml,z as vl,P as kl,r as b,L as j,w as wl,o as gl,x as a,B as g,R as s,j as N,l as v,t as V,A as F,h as hl}from"./vue-vendor-D8N656sj.js";import{h as yl}from"./html2pdf-B3V1dqq7.js";import"./_commonjsHelpers-D6-XlEtG.js";var xl=nl`
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
`,zl={root:function(t){var i=t.instance;return["p-editor",{"p-invalid":i.$invalid}]},toolbar:"p-editor-toolbar",content:"p-editor-content"},Sl=al.extend({name:"editor",style:xl,classes:zl}),Cl={name:"BaseEditor",extends:sl,props:{placeholder:String,readonly:Boolean,formats:Array,editorStyle:null,modules:null},style:Sl,provide:function(){return{$pcEditor:this,$parentInstance:this}}};function C(l){"@babel/helpers - typeof";return C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(l)}function H(l,t){var i=Object.keys(l);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(l);t&&(c=c.filter(function(f){return Object.getOwnPropertyDescriptor(l,f).enumerable})),i.push.apply(i,c)}return i}function El(l){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?H(Object(i),!0).forEach(function(c){Vl(l,c,i[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(i)):H(Object(i)).forEach(function(c){Object.defineProperty(l,c,Object.getOwnPropertyDescriptor(i,c))})}return l}function Vl(l,t,i){return(t=Pl(t))in l?Object.defineProperty(l,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):l[t]=i,l}function Pl(l){var t=$l(l,"string");return C(t)=="symbol"?t:t+""}function $l(l,t){if(C(l)!="object"||!l)return l;var i=l[Symbol.toPrimitive];if(i!==void 0){var c=i.call(l,t);if(C(c)!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(l)}var M=function(){try{return window.Quill}catch{return null}}(),A={name:"Editor",extends:Cl,inheritAttrs:!1,emits:["text-change","selection-change","load"],quill:null,watch:{modelValue:function(t,i){t!==i&&this.quill&&!this.quill.hasFocus()&&this.renderValue(t)},readonly:function(){this.handleReadOnlyChange()}},mounted:function(){var t=this,i={modules:El({toolbar:this.$refs.toolbarElement},this.modules),readOnly:this.readonly,theme:"snow",formats:this.formats,placeholder:this.placeholder};M?(this.quill=new M(this.$refs.editorElement,i),this.initQuill(),this.handleLoad()):ul(()=>import("./quill-B_GN8A0y.js"),__vite__mapDeps([0,1])).then(function(c){c&&ql(t.$refs.editorElement)&&(c.default?t.quill=new c.default(t.$refs.editorElement,i):t.quill=new c(t.$refs.editorElement,i),t.initQuill())}).then(function(){t.handleLoad()})},beforeUnmount:function(){this.quill=null},methods:{renderValue:function(t){if(this.quill)if(t){var i=this.quill.clipboard.convert({html:t});this.quill.setContents(i)}else this.quill.setText("")},initQuill:function(){var t=this;this.renderValue(this.d_value),this.quill.on("text-change",function(i,c,f){if(f==="user"){var q=t.quill.getSemanticHTML(),m=t.quill.getText().trim();q==="<p><br></p>"&&(q=""),t.writeValue(q),t.$emit("text-change",{htmlValue:q,textValue:m,delta:i,source:f,instance:t.quill})}}),this.quill.on("selection-change",function(i,c,f){var q=t.quill.getSemanticHTML(),m=t.quill.getText().trim();t.$emit("selection-change",{htmlValue:q,textValue:m,range:i,oldRange:c,source:f,instance:t.quill})})},handleLoad:function(){this.quill&&this.quill.getModule("toolbar")&&this.$emit("load",{instance:this.quill})},handleReadOnlyChange:function(){this.quill&&this.quill.enable(!this.readonly)}}};function Ll(l,t,i,c,f,q){return $(),P("div",n({class:l.cx("root")},l.ptmi("root")),[o("div",n({ref:"toolbarElement",class:l.cx("toolbar")},l.ptm("toolbar")),[fl(l.$slots,"toolbar",{},function(){return[o("span",n({class:"ql-formats"},l.ptm("formats")),[o("select",n({class:"ql-header",defaultValue:"0"},l.ptm("header")),[o("option",n({value:"1"},l.ptm("option")),"Heading",16),o("option",n({value:"2"},l.ptm("option")),"Subheading",16),o("option",n({value:"0"},l.ptm("option")),"Normal",16)],16),o("select",n({class:"ql-font"},l.ptm("font")),[o("option",ml(vl(l.ptm("option"))),null,16),o("option",n({value:"serif"},l.ptm("option")),null,16),o("option",n({value:"monospace"},l.ptm("option")),null,16)],16)],16),o("span",n({class:"ql-formats"},l.ptm("formats")),[o("button",n({class:"ql-bold",type:"button"},l.ptm("bold")),null,16),o("button",n({class:"ql-italic",type:"button"},l.ptm("italic")),null,16),o("button",n({class:"ql-underline",type:"button"},l.ptm("underline")),null,16)],16),o("span",n({class:"ql-formats"},l.ptm("formats")),[o("select",n({class:"ql-color"},l.ptm("color")),null,16),o("select",n({class:"ql-background"},l.ptm("background")),null,16)],16),o("span",n({class:"ql-formats"},l.ptm("formats")),[o("button",n({class:"ql-list",value:"ordered",type:"button"},l.ptm("list")),null,16),o("button",n({class:"ql-list",value:"bullet",type:"button"},l.ptm("list")),null,16),o("select",n({class:"ql-align"},l.ptm("select")),[o("option",n({defaultValue:""},l.ptm("option")),null,16),o("option",n({value:"center"},l.ptm("option")),null,16),o("option",n({value:"right"},l.ptm("option")),null,16),o("option",n({value:"justify"},l.ptm("option")),null,16)],16)],16),o("span",n({class:"ql-formats"},l.ptm("formats")),[o("button",n({class:"ql-link",type:"button"},l.ptm("link")),null,16),o("button",n({class:"ql-image",type:"button"},l.ptm("image")),null,16),o("button",n({class:"ql-code-block",type:"button"},l.ptm("codeBlock")),null,16)],16),o("span",n({class:"ql-formats"},l.ptm("formats")),[o("button",n({class:"ql-clean",type:"button"},l.ptm("clean")),null,16)],16)]})],16),o("div",n({ref:"editorElement",class:l.cx("content"),style:l.editorStyle},l.ptm("content")),null,16)],16)}A.render=Ll;const Ol={class:"min-h-screen flex flex-col"},Tl={class:"flex-grow flex justify-center w-full md:w-4/5 mx-auto"},Dl={class:"space-y-6"},jl={class:"flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border"},Rl={class:"border rounded-lg"},Il={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},Ul={class:"bg-blue-50 p-4 rounded-lg"},Nl={class:"text-lg font-bold text-blue-600"},Fl={class:"bg-green-50 p-4 rounded-lg"},Hl={class:"text-lg font-bold text-green-600"},Ml={class:"bg-purple-50 p-4 rounded-lg"},Al={class:"text-lg font-bold text-purple-600"},Ql={key:0,class:"flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg"},Bl={class:"space-y-4"},Gl={class:"flex justify-between items-center"},Kl=["innerHTML"],Yl={class:"space-y-4"},Jl={class:"space-y-4"},Wl={class:"text-center"},R="rich-editor-content",Xl=kl({__name:"RichEditor",setup(l){const t=dl(),i=b(),c=b(),f=b(),q=b(""),m=b(!1),L=b(!1),x=b(""),z=b(!1),S=b(!1),h=b(""),y=b(""),w=b(""),O=b(""),Q={toolbar:[[{header:[1,2,3,!1]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],["link","image"],["clean"]],clipboard:{matchVisual:!1}},B=j(()=>{if(!q.value)return 0;const r=q.value.replace(/<[^>]*>/g,"").trim();return r?r.split(/\s+/).length:0}),G=j(()=>q.value?q.value.replace(/<[^>]*>/g,"").length:0),K=j(()=>q.value?q.value.replace(/<[^>]*>/g,"").replace(/\s/g,"").length:0),k=r=>{if(i.value){const e=i.value.getQuill();e.getSelection()&&(r==="bold"?e.format("bold",!e.getFormat().bold):r==="italic"?e.format("italic",!e.getFormat().italic):r==="underline"?e.format("underline",!e.getFormat().underline):r==="insertOrderedList"?e.format("list","ordered"):r==="insertUnorderedList"&&e.format("list","bullet"))}},Y=()=>{h.value="",y.value="",z.value=!0},J=()=>{if(i.value&&h.value&&y.value){const r=i.value.getQuill(),e=r.getSelection();e&&r.insertText(e.index,h.value,"link",y.value)}z.value=!1},W=()=>{w.value="",O.value="",S.value=!0},X=()=>{if(i.value&&w.value){const r=i.value.getQuill(),e=r.getSelection();e&&r.insertEmbed(e.index,"image",w.value)}S.value=!1},Z=r=>{const u=r.target.files?.[0];if(u){const d=new FileReader;d.onload=il=>{w.value=il.target?.result},d.readAsDataURL(u)}},_=()=>{q.value="",localStorage.removeItem(R),x.value="",t.add({severity:"success",summary:"Limpieza exitosa",detail:"Contenido y guardado automático limpiado",life:2e3})},ll=()=>{m.value=!m.value},el=()=>{},ol=()=>{try{localStorage.setItem(R,q.value),x.value=new Date().toLocaleTimeString()}catch(r){console.error("Error guardando en localStorage:",r)}},tl=()=>{try{const r=localStorage.getItem(R);r&&(q.value=r,x.value="Recuperado al abrir")}catch(r){console.error("Error cargando desde localStorage:",r)}},I=async()=>{if(!q.value.trim()){t.add({severity:"warn",summary:"Advertencia",detail:"Por favor escribe algún contenido antes de exportar",life:3e3});return}L.value=!0;try{const r=document.createElement("div");r.innerHTML=`
      <div style="padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333; font-size: 16px;">
        ${q.value}
      </div>
    `;const e={margin:.5,filename:`documento_${new Date().toISOString().split("T")[0]}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0,allowTaint:!0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}};await yl().set(e).from(r).save(),t.add({severity:"success",summary:"PDF generado",detail:"El documento se ha descargado correctamente",life:3e3})}catch(r){console.error("Error al generar PDF:",r),t.add({severity:"error",summary:"Error",detail:"No se pudo generar el PDF",life:3e3})}finally{L.value=!1}};let T;return wl(q,()=>{T&&clearTimeout(T),q.value.trim()&&(T=setTimeout(()=>{ol()},1e3))}),gl(()=>{tl(),document.addEventListener("keydown",r=>{if(r.ctrlKey||r.metaKey)switch(r.key){case"b":r.preventDefault(),k("bold");break;case"i":r.preventDefault(),k("italic");break;case"u":r.preventDefault(),k("underline");break;case"s":r.preventDefault(),I();break}})}),(r,e)=>{const u=hl("tooltip");return $(),P("div",Ol,[a(rl),o("div",Tl,[a(s(pl),{class:"bg-white p-8 rounded-2xl shadow-2xl w-full"},{title:g(()=>e[15]||(e[15]=[o("h1",{class:"mb-3 text-center text-gray-800 text-[0.65rem] sm:text-sm md:text-xl"}," 📝 Editor Rico de Texto ",-1)])),content:g(()=>[o("div",Dl,[o("div",jl,[v(a(s(p),{onClick:e[0]||(e[0]=d=>k("bold")),severity:"secondary",size:"small",icon:"pi pi-bold"},null,512),[[u,"Negrita (Ctrl+B)"]]),v(a(s(p),{onClick:e[1]||(e[1]=d=>k("italic")),severity:"secondary",size:"small",icon:"pi pi-italic"},null,512),[[u,"Cursiva (Ctrl+I)"]]),v(a(s(p),{onClick:e[2]||(e[2]=d=>k("underline")),severity:"secondary",size:"small",icon:"pi pi-underline"},null,512),[[u,"Subrayado (Ctrl+U)"]]),a(s(D),{layout:"vertical"}),v(a(s(p),{onClick:e[3]||(e[3]=d=>k("insertOrderedList")),severity:"secondary",size:"small",icon:"pi pi-list"},null,512),[[u,"Lista numerada"]]),v(a(s(p),{onClick:e[4]||(e[4]=d=>k("insertUnorderedList")),severity:"secondary",size:"small",icon:"pi pi-circle"},null,512),[[u,"Lista con viñetas"]]),a(s(D),{layout:"vertical"}),v(a(s(p),{onClick:Y,severity:"secondary",size:"small",icon:"pi pi-link"},null,512),[[u,"Insertar enlace"]]),v(a(s(p),{onClick:W,severity:"secondary",size:"small",icon:"pi pi-image"},null,512),[[u,"Insertar imagen"]]),a(s(D),{layout:"vertical"}),v(a(s(p),{onClick:_,severity:"danger",size:"small",icon:"pi pi-trash",label:"Limpiar"},null,512),[[u,"Limpiar todo el contenido"]]),v(a(s(p),{onClick:I,severity:"success",size:"small",icon:"pi pi-download",label:"Descargar PDF",loading:L.value},null,8,["loading"]),[[u,"Exportar como PDF"]])]),o("div",Rl,[a(s(A),{modelValue:q.value,"onUpdate:modelValue":e[5]||(e[5]=d=>q.value=d),ref_key:"editorRef",ref:i,modules:Q,style:{height:"500px"},placeholder:"Escribe tu documento aquí...",onTextChange:el},null,8,["modelValue"])]),o("div",Il,[o("div",Ul,[o("div",Nl,V(B.value),1),e[16]||(e[16]=o("div",{class:"text-sm text-blue-500"},"Palabras",-1))]),o("div",Fl,[o("div",Hl,V(G.value),1),e[17]||(e[17]=o("div",{class:"text-sm text-green-500"},"Caracteres",-1))]),o("div",Ml,[o("div",Al,V(K.value),1),e[18]||(e[18]=o("div",{class:"text-sm text-purple-500"},"Sin espacios",-1))])]),x.value?($(),P("div",Ql,[e[19]||(e[19]=o("i",{class:"pi pi-check-circle text-green-500"},null,-1)),o("span",null,"Guardado automáticamente: "+V(x.value),1)])):N("",!0),o("div",Bl,[o("div",Gl,[e[20]||(e[20]=o("h3",{class:"text-lg font-semibold text-gray-700"}," Vista Previa del Documento ",-1)),a(s(p),{onClick:ll,label:m.value?"Ocultar Vista Previa":"Mostrar Vista Previa",severity:"secondary",size:"small",icon:m.value?"pi pi-eye-slash":"pi pi-eye"},null,8,["label","icon"])]),m.value?($(),P("div",{key:0,class:"border rounded-lg p-6 bg-white",ref_key:"previewRef",ref:c},[o("div",{class:"prose max-w-none",innerHTML:q.value},null,8,Kl)],512)):N("",!0)]),a(s(cl),{severity:"info"},{default:g(()=>e[21]||(e[21]=[o("p",null,[o("strong",null,"💡 Sobre esta herramienta:")],-1),o("p",{class:"mt-1"},[F(" Editor de texto rico con formato completo, similar a Microsoft Word. Incluye herramientas de formato, inserción de enlaces e imágenes, y capacidad de exportar directamente a PDF. "),o("strong",null,"Guardado automático:"),F(" Tu contenido se guarda automáticamente en el navegador y se recupera cuando regresas. ")],-1)])),_:1,__:[21]})])]),_:1})]),a(s(U),{visible:z.value,"onUpdate:visible":e[9]||(e[9]=d=>z.value=d),modal:"",header:"Insertar Enlace",style:{width:"450px"}},{footer:g(()=>[a(s(p),{label:"Cancelar",severity:"secondary",onClick:e[8]||(e[8]=d=>z.value=!1)}),a(s(p),{label:"Insertar",onClick:J,disabled:!h.value||!y.value},null,8,["disabled"])]),default:g(()=>[o("div",Yl,[o("div",null,[e[22]||(e[22]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"Texto del enlace",-1)),a(s(E),{modelValue:h.value,"onUpdate:modelValue":e[6]||(e[6]=d=>h.value=d),placeholder:"Texto a mostrar",class:"w-full"},null,8,["modelValue"])]),o("div",null,[e[23]||(e[23]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"URL",-1)),a(s(E),{modelValue:y.value,"onUpdate:modelValue":e[7]||(e[7]=d=>y.value=d),placeholder:"https://...",class:"w-full"},null,8,["modelValue"])])])]),_:1},8,["visible"]),a(s(U),{visible:S.value,"onUpdate:visible":e[14]||(e[14]=d=>S.value=d),modal:"",header:"Insertar Imagen",style:{width:"450px"}},{footer:g(()=>[a(s(p),{label:"Cancelar",severity:"secondary",onClick:e[13]||(e[13]=d=>S.value=!1)}),a(s(p),{label:"Insertar",onClick:X,disabled:!w.value},null,8,["disabled"])]),default:g(()=>[o("div",Jl,[o("div",null,[e[24]||(e[24]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"URL de la imagen",-1)),a(s(E),{modelValue:w.value,"onUpdate:modelValue":e[10]||(e[10]=d=>w.value=d),placeholder:"https://...",class:"w-full"},null,8,["modelValue"])]),o("div",null,[e[25]||(e[25]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"Texto alternativo",-1)),a(s(E),{modelValue:O.value,"onUpdate:modelValue":e[11]||(e[11]=d=>O.value=d),placeholder:"Descripción de la imagen",class:"w-full"},null,8,["modelValue"])]),o("div",Wl,[e[26]||(e[26]=o("p",{class:"text-sm text-gray-500"},"O",-1)),o("input",{ref_key:"fileInput",ref:f,type:"file",accept:"image/*",onChange:Z,class:"hidden"},null,544),a(s(p),{label:"Subir imagen desde archivo",severity:"secondary",onClick:e[12]||(e[12]=d=>f.value.click()),icon:"pi pi-upload"})])])]),_:1},8,["visible"])])}}}),ie=bl(Xl,[["__scopeId","data-v-19fbf335"]]);export{ie as default};
