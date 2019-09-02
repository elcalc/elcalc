<p align="center">
	<img src="https://raw.githubusercontent.com/elcalc/elcalc/master/logo.png" alt="elcalc logo" width="128">
</p>

<h3 align="center">elcalc</h3>
<p align="center">Cross-platform calculator, built with <a href="https://electronjs.org/">Electron</a> :electron:<p>
<p align="center">  
	<a href="https://travis-ci.org/elcalc/elcalc"><img src="https://travis-ci.org/elcalc/elcalc.svg?branch=master" alt="Build Status"></a>
	<a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" alt="Code Style"></a>
  <a href="#"><img src="https://img.shields.io/github/downloads/elcalc/elcalc/total.svg" alt="Downloads"></a> 
	<a href='https://github.com/xxczaki/awesome-calculators'><img src='https://awesome.re/mentioned-badge.svg' alt='Mentioned in Awesome Calculators'></a>
</p>

---

# Highlights

* Supports basic math operations, as well as some scientific functions, such as power, square root, natural logarithm and more!
* Supports common math constants: `π (pi)` and `e`.
* Blazing fast calculation powered by lazy-loaded WebAssembly :zap:
* Special [keyboard support](#keyboard-support).

## Install

Check out [**the latest release**](https://github.com/elcalc/elcalc/releases/latest).

---

## Dev

<img src="https://imgur.com/x3TrxgJ.png" alt="Screenshot" align="right" width="300"></a>

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Rust](https://www.rust-lang.org/tools/install)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)

### Usage

``` bash
# Install dependencies

 $ npm install

# Run the app

 $ npm start
 
# Run lint & tests

 $ npm test
 
# Build 

 $ npm run dist
```
<a href="https://www.patreon.com/akepinski">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## File Tree

```bash
├── build                 			    # Contains configuration files for Webpack etc.
│   └── start.js            		    # Configuration for `npm start` command
│   └── webpack.app.config.js       # Webpack app config (entry point, output)
│   └── webpack.base.config.js      # Webpack base config (plugins, loaders)
├── crate                			      # Contains Rust code, which will be compiled to WASM.
│   ├── src                			
│   │	└── lib.rs            		    # Main Rust file
│   └── Cargo.lock     				      # Cargo lock file
│   └── Cargo.toml      			      # Cargo configuration file
├── resources                 		  # Contains icons for different operating systems
│   ├── icons                			
│   │	└── 512x512.png               # Icon for other operating systems (like Linux)
│   └── icon.icns       			      # Icon for macOS
│   └── icon.ico      				      # Icon for Windows
├── src                				      # Main application folder
│   ├── stylesheets                			
│   │	└── main.css             	    # Styles
│   └── app.html          			    # Main HTML file
│   └── app.js       				        # Main JS file
│   └── background.js     			    # Electron configuration
├── test                			      # Tests folder
│   └── spec.js       				      # Spectron tests
├── .npmrc                			    # npm config
├── .stylelintrc          			    # stylelint config
├── .travis.yml           			    # Travis CI config
├── babel.config.js       			    # Babel config
```

## Keyboard Support

| Key | Description |
| ------:| -----------:|
| <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>, <kbd>4</kbd>, <kbd>5</kbd>, <kbd>6</kbd>, <kbd>7</kbd>, <kbd>8</kbd>, <kbd>9</kbd>, <kbd>0</kbd> | Type numbers |
| <kbd>+</kbd>, <kbd>-</kbd>, <kbd>* or x</kbd>, <kbd>/</kbd>, <kbd>.</kbd>, <kbd>^</kbd>, <kbd>e</kbd>   | Type symbols |
| <kbd>Enter</kbd> or <kbd>Return</kbd> | Evaluate equation |
| <kbd>Backspace</kbd> or <kbd>Delete</kbd> | Clear calculator output |

### License

MIT
