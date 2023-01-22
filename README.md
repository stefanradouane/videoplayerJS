# vidplayer

## 🎥 About this project
Styling the default controls of an HTML `<video>` is not possible, but what if you want to make a custom vidplayervividplayers the solution for this problem. With this js front-end library you can create an vidpvidplayerr than ever before.

## ✨ Installation
Using this library is very easy, use it by simply adding a `<script>` tag to your HTML.

<details>
<summary><strong>Install this library with the script tag</strong></summary>

So you want to use this library with a `script` tag:<br>

1. First of all add the script tag to your website. The source of this URL should be url
``` HTML
  <body>
    ...
    <script src="https://stefanradouane.github.io/vidplayer/script.js"></script>
  </body>
```
2. Now you have to add the link tag to the head of your website. The source of this URL should be

``` HTML
<head>
  ...
  <link rel="stylesheet" href="https://stefanradouane.github.io/vidplayer/style.css" />
</head>
```

3. <strong>Well done, for now you are all set up, <em>ain't that easy</em></strong>

> There might be a change that these links doesn't work. In that case it's good that you have installed the module so you have these files locally inside your `node_modules` directory

## Using this library

You have now installed this library. The usage of this library depends if you have installed it from NPM or with a `script` tag.

<details>
<summary><strong>Using this library with a script tag</strong></summary>

You added the the script tag on your HTML page. Now you have to create a vidplayer

1. First create your video element and add the class name of vidplayer

```HTML
<video class="vidplayer
  <source ...>
</video>
```

2. This vidplayeran be configured by adding a dataset attribute of `settings` to this vividplayer

```HTML
<video class="vidplayerdata-settings="{}">
```

<em>Well done, you have created a default vidplayerem>

3. Adding a theme to the vidplayer

There are a couple automatic created themes you can use. These are:

* default
* minimal
* box
* box-minimal
* flashy
* flashy-minimal

You can use a theme by simply defining a theme in the dataset `settings`.

```HTML
<video class="vidplayerdata-settings="{'theme': 'THEME NAME'}">
```

> <em>If there is no theme defined the default theme will be used.</em>

4. <strong>Adding a colorscheme to the vidplayer/strong>

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


You can apply your sites colorscheme to the vidplayery defining the colorscheme tot the dataset `settings`.
To define the colorscheme there are a couple posibilities
<em>The color value can be RGB, RGBA, HEX or an CSScolorName</em>

1. Define only the tile color.

By defining a `String` as the colorscheme only the tile color will be set. 

```HTML
<video class="vidplayerdata-settings="{'colorscheme': 'COLOR'}">
```

2. Define base color and tile color

By defining an `Array` of two value's as the color scheme the tile color an base color will be defined.

```HTML
<video class="vidplayerdata-settings="{'colorscheme': ['COLOR', 'COLOR']}">
```

<em><strong>The first value represents the base color, and the second value the tile color</strong></em>

3. Define base color, tile color and hover color

By defining an `Array` of three value's as the color scheme the tile color, base color and hover color will be defined.

```HTML
<video class="vidplayerdata-settings="{'colorscheme': ['COLOR', 'COLOR', 'COLOR']}">
```

<em><strong>The first value represents the base color, the second value the tile color and the third value the hover color</strong></em>

> <em>If there is no theme defined the default theme will be used.</em>


### That's it. Enjoy the vidplayer

## Use case

<details>
<summary><strong>Use case library as script tag</strong></summary>

```HTML
<head>
...
<link rel="stylesheet" src="https://stefanradouane.github.io/vidplayer/style.css">
</head>

<body>
...
<video class="vidplayerdata-settings="{'theme': 'flashy', 'colorscheme': ['rgba(21,28,30,0.75)', 'rgb(190, 30, 200)']}">
  <source>
</video>
...
<script src="https://stefanradouane.github.io/vidplayer/script.js"></script>
</body>

```



<!-- Making a `<video>` element in HTML is easy. The default controls are able if you add the property `controls` to the video element (`<video controls>`) -->


<!-- A javascript library to create front-end video components -->
