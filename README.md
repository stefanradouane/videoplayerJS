# videoplayerJS

## 🎥 About this project
Styling the default controls of an HTML `<video>` is not possible, but what if you want to make a custom videoplayer. videoplayerJS is the solution for this problem. With this js front-end library you can create an videoplayer easier than ever before.

## ✨ Installation
To use this library you can use multiple solutions. The first solution is by simply adding a `<script>` tag to your HTML. The second solution is to install this module through NPM.

<details>
<summary><strong>Install this library with the script tag</strong></summary>

So you want to use this library with a `script` tag:<br>

1. First of all add the script tag to your website. The source of this URL should be url
``` HTML
  <body>
    ...
    <script src="https://www.github.com"></script>
  </body>
```
2. Now you have to add the link tag to the head of your website. The source of this URL should be

``` HTML
<head>
  ...
  <link rel="stylesheet" href="https://www.github.com" />
</head>
```

3. <strong>Well done, for now you are all set up, <em>ain't that easy</em></strong>

</details>
<details>
<summary><strong>Install this library with NPM</strong></summary>

So you want to use this as a node module and download it through NPM:<br>

1. First of all make sure you have NPM installed // [Download NPM/node.js](https://nodejs.org/en/download/)

```ZSH
// Check NPM version with the terminal
npm -v
```

2. If you have installed NPM, install the package with the terminal.
```ZSH
npm install videoplayerJS
```

3. <strong>Well done, for now you are all set up, <em>ain't that easy</em></strong>
</details>

## Using this library

You have now installed this library. The usage of this library depends if you have installed it from NPM or with a `script` tag.

<details>
<summary><strong>Using this library with a script tag</strong></summary>

You added the the script tag on your HTML page. Now you have to create a videoplayer.

1. First create your video element and add the class name of videoplayer.

```HTML
<video class="videoplayer">
  <source ...>
</video>
```

2. This videoplayer can be configured by adding a dataset attribute of `settings` to this videoplayer.

```HTML
<video class="videoplayer" data-settings="{}">
```

<em>Well done, you have created a default videoplayer</em>

3. Adding a theme to the videoplayer.

There are a couple automatic created themes you can use. These are:

* default
* minimal
* box
* box-minimal
* flashy
* flashy-minimal

You can use a theme by simply defining a theme in the dataset `settings`.

```HTML
<video class="videoplayer" data-settings="{'theme': 'THEME NAME'}">
```

> <em>If there is no theme defined the default theme will be used.</em>

4. <strong>Adding a colorscheme to the videoplayer.</strong>

The colorscheme contains three colors. These colors are: 

* The base color 
  * This is the background color of a controllable part (eg. the background of the controller section).
  * <em>this color can be undefined than in will be created by itself (default = rgba(11,11,11, 0.75))</em>
* The tile color 
  * This is the fill color of the icons (eg. icon play)
  * <em>this color can be undefined than in will be created by itself (default = rgba(220, 220, 220, 1))</em>
* The hover color
  * This color is the fill color when a control is hovered. 
  * <em>this color can be undefined than in will be created by itself (default = tile color * 80%)</em>


You can apply your sites colorscheme to the videoplayer by defining the colorscheme tot the dataset `settings`.
To define the colorscheme there are a couple posibilities
<em>The color value can be RGB, RGBA, HEX or an CSScolorName</em>

1. Define only the tile color.

By defining a `String` as the colorscheme only the tile color will be set. 

```HTML
<video class="videoplayer" data-settings="{'colorscheme': 'COLOR'}">
```

2. Define base color and tile color

By defining an `Array` of two value's as the color scheme the tile color an base color will be defined.

```HTML
<video class="videoplayer" data-settings="{'colorscheme': ['COLOR', 'COLOR']}">
```

<em><strong>The first value represents the base color, and the second value the tile color</strong></em>

3. Define base color, tile color and hover color

By defining an `Array` of three value's as the color scheme the tile color, base color and hover color will be defined.

```HTML
<video class="videoplayer" data-settings="{'colorscheme': ['COLOR', 'COLOR', 'COLOR']}">
```

<em><strong>The first value represents the base color, the second value the tile color and the third value the hover color</strong></em>

> <em>If there is no theme defined the default theme will be used.</em>



### That's it. Enjoy the videoplayer!


<!-- const themes = ["flashy", "flashy-minimal", "box", "box-minimal", "minimal", "default"] -->

</details>

<details>
<summary><strong>Using this library as a NPM module</strong></summary>

</details>


<!-- Making a `<video>` element in HTML is easy. The default controls are able if you add the property `controls` to the video element (`<video controls>`) -->


<!-- A javascript library to create front-end video components -->
