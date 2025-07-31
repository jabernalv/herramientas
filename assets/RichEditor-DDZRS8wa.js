const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/quill-B_GN8A0y.js","assets/_commonjsHelpers-D6-XlEtG.js"])))=>i.map(i=>d[i]);
import{_ as ae}from"./BreadcrumbNav.vue_vue_type_script_setup_true_lang-CwPMA7cQ.js";import{N as se,O as qe,Q as de,R as ce,u as pe,a as u,S as I,F as ue,m as be,h as L,U as F}from"./primevue-CTM77RMy.js";import{c as D,l as me,_ as fe}from"./index-DrBQnuTu.js";import{c as $,d as b,e as o,v as ke,m as a,y as ve,z as we,P as ge,r as f,L as R,w as he,o as ye,x as s,B as p,R as r,j as M,l as g,k,t as P,A as U,h as xe}from"./vue-vendor-ByoO1CXK.js";import{h as ze}from"./html2pdf-Cjq773vq.js";import{_ as Ce}from"./IconText.vue_vue_type_script_setup_true_lang-DoIZcxVq.js";import{L as Se}from"./list-8jFALFCd.js";import{L as Ee}from"./link-2-e85Pdjs8.js";import{I as Ve}from"./image-B-ASkV1r.js";import{T as Le}from"./trash-2-BKb5hJLD.js";import{D as Pe}from"./download-QK3e7P00.js";import{C as $e}from"./circle-check-big-CRaG_5Hw.js";import{E as De}from"./eye-off-DW2i-YVq.js";import{E as Oe}from"./eye-CjYd8QvZ.js";import{U as Te}from"./upload-BcSM34Hb.js";import"./_commonjsHelpers-D6-XlEtG.js";/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=D("bold",[["path",{d:"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",key:"mg9rjx"}]]);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=D("circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=D("italic",[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]]);/**
 * @license lucide-vue-next v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=D("underline",[["path",{d:"M6 4v6a6 6 0 0 0 12 0V4",key:"9kb039"}],["line",{x1:"4",x2:"20",y1:"20",y2:"20",key:"nun2al"}]]);var He=se`
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
`,Ne={root:function(t){var i=t.instance;return["p-editor",{"p-invalid":i.$invalid}]},toolbar:"p-editor-toolbar",content:"p-editor-content"},Fe=qe.extend({name:"editor",style:He,classes:Ne}),Me={name:"BaseEditor",extends:de,props:{placeholder:String,readonly:Boolean,formats:Array,editorStyle:null,modules:null},style:Fe,provide:function(){return{$pcEditor:this,$parentInstance:this}}};function V(e){"@babel/helpers - typeof";return V=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(e)}function B(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter(function(v){return Object.getOwnPropertyDescriptor(e,v).enumerable})),i.push.apply(i,c)}return i}function Be(e){for(var t=1;t<arguments.length;t++){var i=arguments[t]!=null?arguments[t]:{};t%2?B(Object(i),!0).forEach(function(c){Ae(e,c,i[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):B(Object(i)).forEach(function(c){Object.defineProperty(e,c,Object.getOwnPropertyDescriptor(i,c))})}return e}function Ae(e,t,i){return(t=Qe(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function Qe(e){var t=_e(e,"string");return V(t)=="symbol"?t:t+""}function _e(e,t){if(V(e)!="object"||!e)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var c=i.call(e,t);if(V(c)!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var A=function(){try{return window.Quill}catch{return null}}(),Q={name:"Editor",extends:Me,inheritAttrs:!1,emits:["text-change","selection-change","load"],quill:null,watch:{modelValue:function(t,i){t!==i&&this.quill&&!this.quill.hasFocus()&&this.renderValue(t)},readonly:function(){this.handleReadOnlyChange()}},mounted:function(){var t=this,i={modules:Be({toolbar:this.$refs.toolbarElement},this.modules),readOnly:this.readonly,theme:"snow",formats:this.formats,placeholder:this.placeholder};A?(this.quill=new A(this.$refs.editorElement,i),this.initQuill(),this.handleLoad()):me(()=>import("./quill-B_GN8A0y.js"),__vite__mapDeps([0,1])).then(function(c){c&&ce(t.$refs.editorElement)&&(c.default?t.quill=new c.default(t.$refs.editorElement,i):t.quill=new c(t.$refs.editorElement,i),t.initQuill())}).then(function(){t.handleLoad()})},beforeUnmount:function(){this.quill=null},methods:{renderValue:function(t){if(this.quill)if(t){var i=this.quill.clipboard.convert({html:t});this.quill.setContents(i)}else this.quill.setText("")},initQuill:function(){var t=this;this.renderValue(this.d_value),this.quill.on("text-change",function(i,c,v){if(v==="user"){var q=t.quill.getSemanticHTML(),w=t.quill.getText().trim();q==="<p><br></p>"&&(q=""),t.writeValue(q),t.$emit("text-change",{htmlValue:q,textValue:w,delta:i,source:v,instance:t.quill})}}),this.quill.on("selection-change",function(i,c,v){var q=t.quill.getSemanticHTML(),w=t.quill.getText().trim();t.$emit("selection-change",{htmlValue:q,textValue:w,range:i,oldRange:c,source:v,instance:t.quill})})},handleLoad:function(){this.quill&&this.quill.getModule("toolbar")&&this.$emit("load",{instance:this.quill})},handleReadOnlyChange:function(){this.quill&&this.quill.enable(!this.readonly)}}};function Ge(e,t,i,c,v,q){return b(),$("div",a({class:e.cx("root")},e.ptmi("root")),[o("div",a({ref:"toolbarElement",class:e.cx("toolbar")},e.ptm("toolbar")),[ke(e.$slots,"toolbar",{},function(){return[o("span",a({class:"ql-formats"},e.ptm("formats")),[o("select",a({class:"ql-header",defaultValue:"0"},e.ptm("header")),[o("option",a({value:"1"},e.ptm("option")),"Heading",16),o("option",a({value:"2"},e.ptm("option")),"Subheading",16),o("option",a({value:"0"},e.ptm("option")),"Normal",16)],16),o("select",a({class:"ql-font"},e.ptm("font")),[o("option",ve(we(e.ptm("option"))),null,16),o("option",a({value:"serif"},e.ptm("option")),null,16),o("option",a({value:"monospace"},e.ptm("option")),null,16)],16)],16),o("span",a({class:"ql-formats"},e.ptm("formats")),[o("button",a({class:"ql-bold",type:"button"},e.ptm("bold")),null,16),o("button",a({class:"ql-italic",type:"button"},e.ptm("italic")),null,16),o("button",a({class:"ql-underline",type:"button"},e.ptm("underline")),null,16)],16),o("span",a({class:"ql-formats"},e.ptm("formats")),[o("select",a({class:"ql-color"},e.ptm("color")),null,16),o("select",a({class:"ql-background"},e.ptm("background")),null,16)],16),o("span",a({class:"ql-formats"},e.ptm("formats")),[o("button",a({class:"ql-list",value:"ordered",type:"button"},e.ptm("list")),null,16),o("button",a({class:"ql-list",value:"bullet",type:"button"},e.ptm("list")),null,16),o("select",a({class:"ql-align"},e.ptm("select")),[o("option",a({defaultValue:""},e.ptm("option")),null,16),o("option",a({value:"center"},e.ptm("option")),null,16),o("option",a({value:"right"},e.ptm("option")),null,16),o("option",a({value:"justify"},e.ptm("option")),null,16)],16)],16),o("span",a({class:"ql-formats"},e.ptm("formats")),[o("button",a({class:"ql-link",type:"button"},e.ptm("link")),null,16),o("button",a({class:"ql-image",type:"button"},e.ptm("image")),null,16),o("button",a({class:"ql-code-block",type:"button"},e.ptm("codeBlock")),null,16)],16),o("span",a({class:"ql-formats"},e.ptm("formats")),[o("button",a({class:"ql-clean",type:"button"},e.ptm("clean")),null,16)],16)]})],16),o("div",a({ref:"editorElement",class:e.cx("content"),style:e.editorStyle},e.ptm("content")),null,16)],16)}Q.render=Ge;const Ke={class:"min-h-screen flex flex-col"},Ye={class:"flex-grow flex justify-center w-full md:w-4/5 mx-auto"},Je={class:"mb-3 text-center text-gray-800 text-[0.65rem] sm:text-sm md:text-xl"},We={class:"space-y-6"},Xe={class:"flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border"},Ze={class:"border rounded-lg"},el={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},ll={class:"bg-blue-50 p-4 rounded-lg"},ol={class:"text-lg font-bold text-blue-600"},tl={class:"bg-green-50 p-4 rounded-lg"},rl={class:"text-lg font-bold text-green-600"},il={class:"bg-purple-50 p-4 rounded-lg"},nl={class:"text-lg font-bold text-purple-600"},al={key:0,class:"flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg"},sl={class:"space-y-4"},ql={class:"flex justify-between items-center"},dl=["innerHTML"],cl={class:"space-y-4"},pl={class:"space-y-4"},ul={class:"text-center"},H="rich-editor-content",bl=ge({__name:"RichEditor",setup(e){const t=pe(),i=f(),c=f(),v=f(),q=f(""),w=f(!1),O=f(!1),C=f(""),S=f(!1),E=f(!1),x=f(""),z=f(""),y=f(""),T=f(""),_={toolbar:[[{header:[1,2,3,!1]}],["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["blockquote","code-block"],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],["link","image"],["clean"]],clipboard:{matchVisual:!1}},G=R(()=>{if(!q.value)return 0;const n=q.value.replace(/<[^>]*>/g,"").trim();return n?n.split(/\s+/).length:0}),K=R(()=>q.value?q.value.replace(/<[^>]*>/g,"").length:0),Y=R(()=>q.value?q.value.replace(/<[^>]*>/g,"").replace(/\s/g,"").length:0),h=n=>{if(i.value){const l=i.value.getQuill();l.getSelection()&&(n==="bold"?l.format("bold",!l.getFormat().bold):n==="italic"?l.format("italic",!l.getFormat().italic):n==="underline"?l.format("underline",!l.getFormat().underline):n==="insertOrderedList"?l.format("list","ordered"):n==="insertUnorderedList"&&l.format("list","bullet"))}},J=()=>{x.value="",z.value="",S.value=!0},W=()=>{if(i.value&&x.value&&z.value){const n=i.value.getQuill(),l=n.getSelection();l&&n.insertText(l.index,x.value,"link",z.value)}S.value=!1},X=()=>{y.value="",T.value="",E.value=!0},Z=()=>{if(i.value&&y.value){const n=i.value.getQuill(),l=n.getSelection();l&&n.insertEmbed(l.index,"image",y.value)}E.value=!1},ee=n=>{const m=n.target.files?.[0];if(m){const d=new FileReader;d.onload=ne=>{y.value=ne.target?.result},d.readAsDataURL(m)}},le=()=>{q.value="",localStorage.removeItem(H),C.value="",t.add({severity:"success",summary:"Limpieza exitosa",detail:"Contenido y guardado automático limpiado",life:2e3})},oe=()=>{w.value=!w.value},te=()=>{},re=()=>{try{localStorage.setItem(H,q.value),C.value=new Date().toLocaleTimeString()}catch(n){console.error("Error guardando en localStorage:",n)}},ie=()=>{try{const n=localStorage.getItem(H);n&&(q.value=n,C.value="Recuperado al abrir")}catch(n){console.error("Error cargando desde localStorage:",n)}},N=async()=>{if(!q.value.trim()){t.add({severity:"warn",summary:"Advertencia",detail:"Por favor escribe algún contenido antes de exportar",life:3e3});return}O.value=!0;try{const n=document.createElement("div");n.innerHTML=`
      <div style="padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333; font-size: 16px;">
        ${q.value}
      </div>
    `;const l={margin:.5,filename:`documento_${new Date().toISOString().split("T")[0]}.pdf`,image:{type:"jpeg",quality:.98},html2canvas:{scale:2,useCORS:!0,allowTaint:!0},jsPDF:{unit:"in",format:"letter",orientation:"portrait"}};await ze().set(l).from(n).save(),t.add({severity:"success",summary:"PDF generado",detail:"El documento se ha descargado correctamente",life:3e3})}catch(n){console.error("Error al generar PDF:",n),t.add({severity:"error",summary:"Error",detail:"No se pudo generar el PDF",life:3e3})}finally{O.value=!1}};let j;return he(q,()=>{j&&clearTimeout(j),q.value.trim()&&(j=setTimeout(()=>{re()},1e3))}),ye(()=>{ie(),document.addEventListener("keydown",n=>{if(n.ctrlKey||n.metaKey)switch(n.key){case"b":n.preventDefault(),h("bold");break;case"i":n.preventDefault(),h("italic");break;case"u":n.preventDefault(),h("underline");break;case"s":n.preventDefault(),N();break}})}),(n,l)=>{const m=xe("tooltip");return b(),$("div",Ke,[s(ae),o("div",Ye,[s(r(be),{class:"bg-white p-8 rounded-2xl shadow-2xl w-full"},{title:p(()=>[o("h1",Je,[s(Ce,{class:"inline-block mr-2 w-16 h-16"}),l[15]||(l[15]=U(" Editor enriquecido de texto "))])]),content:p(()=>[o("div",We,[o("div",Xe,[g((b(),k(r(u),{onClick:l[0]||(l[0]=d=>h("bold")),severity:"secondary",size:"small"},{icon:p(()=>[s(r(je),{class:"w-4 h-4"})]),_:1})),[[m,"Negrita (Ctrl+B)"]]),g((b(),k(r(u),{onClick:l[1]||(l[1]=d=>h("italic")),severity:"secondary",size:"small"},{icon:p(()=>[s(r(Re),{class:"w-4 h-4"})]),_:1})),[[m,"Cursiva (Ctrl+I)"]]),g((b(),k(r(u),{onClick:l[2]||(l[2]=d=>h("underline")),severity:"secondary",size:"small"},{icon:p(()=>[s(r(Ue),{class:"w-4 h-4"})]),_:1})),[[m,"Subrayado (Ctrl+U)"]]),s(r(I),{layout:"vertical"}),g((b(),k(r(u),{onClick:l[3]||(l[3]=d=>h("insertOrderedList")),severity:"secondary",size:"small"},{icon:p(()=>[s(r(Se),{class:"w-4 h-4"})]),_:1})),[[m,"Lista numerada"]]),g((b(),k(r(u),{onClick:l[4]||(l[4]=d=>h("insertUnorderedList")),severity:"secondary",size:"small"},{icon:p(()=>[s(r(Ie),{class:"w-4 h-4"})]),_:1})),[[m,"Lista con viñetas"]]),s(r(I),{layout:"vertical"}),g((b(),k(r(u),{onClick:J,severity:"secondary",size:"small"},{icon:p(()=>[s(r(Ee),{class:"w-4 h-4"})]),_:1})),[[m,"Insertar enlace"]]),g((b(),k(r(u),{onClick:X,severity:"secondary",size:"small"},{icon:p(()=>[s(r(Ve),{class:"w-4 h-4"})]),_:1})),[[m,"Insertar imagen"]]),s(r(I),{layout:"vertical"}),g((b(),k(r(u),{onClick:le,severity:"danger",size:"small",label:"Limpiar"},{icon:p(()=>[s(r(Le),{class:"w-4 h-4 mr-2"})]),_:1})),[[m,"Limpiar todo el contenido"]]),g((b(),k(r(u),{onClick:N,severity:"success",size:"small",label:"Descargar PDF",loading:O.value},{icon:p(()=>[s(r(Pe),{class:"w-4 h-4 mr-2"})]),_:1},8,["loading"])),[[m,"Exportar como PDF"]])]),o("div",Ze,[s(r(Q),{modelValue:q.value,"onUpdate:modelValue":l[5]||(l[5]=d=>q.value=d),ref_key:"editorRef",ref:i,modules:_,style:{height:"500px"},placeholder:"Escribe tu documento aquí...",onTextChange:te},null,8,["modelValue"])]),o("div",el,[o("div",ll,[o("div",ol,P(G.value),1),l[16]||(l[16]=o("div",{class:"text-sm text-blue-500"},"Palabras",-1))]),o("div",tl,[o("div",rl,P(K.value),1),l[17]||(l[17]=o("div",{class:"text-sm text-green-500"},"Caracteres",-1))]),o("div",il,[o("div",nl,P(Y.value),1),l[18]||(l[18]=o("div",{class:"text-sm text-purple-500"},"Sin espacios",-1))])]),C.value?(b(),$("div",al,[s(r($e),{class:"w-4 h-4 text-green-500"}),o("span",null,"Guardado automáticamente: "+P(C.value),1)])):M("",!0),o("div",sl,[o("div",ql,[l[19]||(l[19]=o("h3",{class:"text-lg font-semibold text-gray-700"}," Vista Previa del Documento ",-1)),s(r(u),{onClick:oe,label:w.value?"Ocultar Vista Previa":"Mostrar Vista Previa",severity:"secondary",size:"small"},{icon:p(()=>[w.value?(b(),k(r(De),{key:0,class:"w-4 h-4"})):(b(),k(r(Oe),{key:1,class:"w-4 h-4"}))]),_:1},8,["label"])]),w.value?(b(),$("div",{key:0,class:"border rounded-lg p-6 bg-white",ref_key:"previewRef",ref:c},[o("div",{class:"prose max-w-none",innerHTML:q.value},null,8,dl)],512)):M("",!0)]),s(r(ue),{severity:"info"},{default:p(()=>l[20]||(l[20]=[o("p",null,[o("strong",null,"💡 Sobre esta herramienta:")],-1),o("p",{class:"mt-1"},[U(" Editor de texto rico con formato completo, similar a Microsoft Word. Incluye herramientas de formato, inserción de enlaces e imágenes, y capacidad de exportar directamente a PDF. "),o("strong",null,"Guardado automático:"),U(" Tu contenido se guarda automáticamente en el navegador y se recupera cuando regresas. ")],-1)])),_:1,__:[20]})])]),_:1})]),s(r(F),{visible:S.value,"onUpdate:visible":l[9]||(l[9]=d=>S.value=d),modal:"",header:"Insertar Enlace",style:{width:"450px"}},{footer:p(()=>[s(r(u),{label:"Cancelar",severity:"secondary",onClick:l[8]||(l[8]=d=>S.value=!1)}),s(r(u),{label:"Insertar",onClick:W,disabled:!x.value||!z.value},null,8,["disabled"])]),default:p(()=>[o("div",cl,[o("div",null,[l[21]||(l[21]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"Texto del enlace",-1)),s(r(L),{modelValue:x.value,"onUpdate:modelValue":l[6]||(l[6]=d=>x.value=d),placeholder:"Texto a mostrar",class:"w-full"},null,8,["modelValue"])]),o("div",null,[l[22]||(l[22]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"URL",-1)),s(r(L),{modelValue:z.value,"onUpdate:modelValue":l[7]||(l[7]=d=>z.value=d),placeholder:"https://...",class:"w-full"},null,8,["modelValue"])])])]),_:1},8,["visible"]),s(r(F),{visible:E.value,"onUpdate:visible":l[14]||(l[14]=d=>E.value=d),modal:"",header:"Insertar Imagen",style:{width:"450px"}},{footer:p(()=>[s(r(u),{label:"Cancelar",severity:"secondary",onClick:l[13]||(l[13]=d=>E.value=!1)}),s(r(u),{label:"Insertar",onClick:Z,disabled:!y.value},null,8,["disabled"])]),default:p(()=>[o("div",pl,[o("div",null,[l[23]||(l[23]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"URL de la imagen",-1)),s(r(L),{modelValue:y.value,"onUpdate:modelValue":l[10]||(l[10]=d=>y.value=d),placeholder:"https://...",class:"w-full"},null,8,["modelValue"])]),o("div",null,[l[24]||(l[24]=o("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"Texto alternativo",-1)),s(r(L),{modelValue:T.value,"onUpdate:modelValue":l[11]||(l[11]=d=>T.value=d),placeholder:"Descripción de la imagen",class:"w-full"},null,8,["modelValue"])]),o("div",ul,[l[25]||(l[25]=o("p",{class:"text-sm text-gray-500"},"O",-1)),o("input",{ref_key:"fileInput",ref:v,type:"file",accept:"image/*",onChange:ee,class:"hidden"},null,544),s(r(u),{label:"Subir imagen desde archivo",severity:"secondary",onClick:l[12]||(l[12]=d=>v.value.click())},{icon:p(()=>[s(r(Te),{class:"w-4 h-4 mr-2"})]),_:1})])])]),_:1},8,["visible"])])}}}),$l=fe(bl,[["__scopeId","data-v-1a6bd46f"]]);export{$l as default};
