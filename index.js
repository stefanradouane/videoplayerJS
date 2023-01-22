// exports.videoplayerJS = class videoplayerJS {
//         constructor(node, index) {
//             this.node = node
//             this.defaultStyling = this.getDefaultStyling();
//             this.id = index + 1
//             this.settings = getVideoSettings(this.node)
//             if (this.settings) {
//                 this.settings?.dev == true ? this.node.controls = true : this.controls = false;
//                 if (this.settings?.theme != undefined) {
//                     const item = themes.find(element => element == this.settings?.theme)
//                     if(item) {
//                         this.theme = this.settings.theme
//                     } else {
//                         warningMes(errorMessages.wrongTheme)
//                         this.theme = "default"
//                     }}
//                 } else {
//                     this.theme = "default";
//                 }                    
//             // CHECK if user uses a phone in that case use the
//             this.render()
//         }
    
//         bindEvents() {
//             // LOAD METADATA
//             this.node.addEventListener("loadedmetadata", (e) => {
//                 this.timeManager(this.elements.timer, this.node.currentTime)
//             })
    
//             // ACTION (play/pause/end)
//             this.elements.buttonMiddle.addEventListener("click", (e) => {
//                 this.videoAction("play", e)
//             })
//             this.elements.buttonController.addEventListener("click", (e) => {
//                 this.videoAction("play", e)
//             })
    
//             this.node.addEventListener("ended", (e) => {
//                 this.videoAction("play", e)
//             })
    
//             this.node.addEventListener("click", (e) => {
//                 this.videoAction("play", e)
//             })
    
//             // TIME + LOADING
//             this.node.addEventListener("stalled", (e) => {
//                 this.videoAction("loading", e)
//             })
    
//             this.node.addEventListener("waiting", (e) => {
//                 this.videoAction("loading", e)
//             })
    
//             this.node.addEventListener("canplay", (e) => {
//                 this.videoAction("buffer", e)
//                 this.videoAction("timer", e)
//                 this.videoAction("loading", e)
//             })
    
//             this.node.addEventListener("canplaythrough", (e) => {
//                 this.videoAction("buffer", e)
//                 this.videoAction("timer", e)
//             })
    
//             this.elements.runnableTrack.addEventListener("input", (e) => {
//                 this.videoAction("timer", e)
//             })
    
//             this.elements.runnableTrack.addEventListener("change", (e) => {
//                 this.videoAction("timer", e)
//             })
    
//             // VOLUME
//             this.elements.volume.volumeButton.addEventListener("click", (e) => {
//                 this.videoAction("volume", e)
//             })
    
//             this.elements.volume.volumeTrack.addEventListener("input", (e) => {
//                 this.videoAction("volume", e)
//             })
    
    
//             // FULL SCREEN
//             this.elements.fullscreen.addEventListener("click", (e) => {
//                 this.videoAction("fullscreen", e)
//             })
    
//             document.addEventListener("fullscreenchange", (e) => {
//                 let isFullScreen = document.isFullScreen || document.msIsFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
//                 if(e.target == this.node || e.target == this.blocks.parentNode){
//                     if(!isFullScreen) {
//                         this.videoAction("fullscreen", "close") 
//                     }
//                 }
//             })
    
//             this.node.addEventListener("dblclick", () => {
//                 this.videoAction("fullscreen") 
//             })
    
//             // KEY EVENTS
//             document.addEventListener("keydown", (e) => {
//                 switch (e.key.toLowerCase()) {
//                     case "m":
//                         e.preventDefault()
//                         this.videoAction("volume", e)
//                         break;
                    
//                     case "f":
//                         this.videoAction("fullscreen", "close")
                        
//                     default:
//                         break;
//                 }
    
//             })
//         }
    
//         init() {
//             if (!this.node.poster) {
//                 this.node.style.background = "#333"
//             }
            
            
//             this.blocks = this.makeBlockElements()
//             this.elements = this.makeElementElements()
//             this.appendElements()
//             if(typeof this.settings.colorscheme === "string") {
//                 this.blocks.parentNode.style.setProperty("--base-color", "rgba(11,11,11, .75)")
//                 this.blocks.parentNode.style.setProperty("--tile-color", this.settings.colorscheme || "rgba(220, 220, 220, 1)")
//                 this.blocks.parentNode.style.setProperty("--hover-color",  colorScheme(this.settings.colorscheme) || "rgba(200, 200, 200, 1)")
//             } else {
//                 this.blocks.parentNode.style.setProperty("--base-color", this.settings.colorscheme ? this.settings.colorscheme[0] : "rgba(11,11,11, .75)")
//                 this.blocks.parentNode.style.setProperty("--tile-color", this.settings.colorscheme ? this.settings.colorscheme[1] : "rgba(220, 220, 220, 1)")
//                 this.blocks.parentNode.style.setProperty("--hover-color", this.settings.colorscheme ? colorScheme(this.settings.colorscheme[1]) : "rgba(200, 200, 200, 1)")
//             }
//         }
    
//         makeBlockElements() {
//             const parentNode = assignParent("section", ["videoplayer-container", `videoplayer-container-${this.id}`], this.node, this.theme)
//             const blockControls = DOMelementWithClass("section", "videoplayer-controls"); // middle
//             const blockController = DOMelementWithClass("section", "videoplayer-controller"); // bottom
//             const styleSheet = this.makeElement("stylesheet")
//             return {
//                 parentNode,
//                 blockControls,
//                 blockController,
//                 styleSheet
//             }
//         }
    
//         makeElementElements() {
//             const buttonMiddle = this.makeElement("button", "action");
//             const buttonController = this.makeElement("button", "action");
//             const runnableTrack = this.makeElement("runnabletrack", "time")
//             const volume = this.makeElement("volume")
//             const timer = this.makeElement("timer")
//             const fullscreen = this.makeElement("fullscreen")
//             return {
//                 buttonMiddle,
//                 buttonController,
//                 runnableTrack,
//                 volume,
//                 timer,
//                 fullscreen
//             }
//         }
    
//         appendElements() {
//             document.head.append(this.blocks.styleSheet)
//             DOMappendChildren(this.blocks.parentNode, [this.blocks.blockControls, this.blocks.blockController, this.elements.fullscreen])
//             DOMappendChild(this.blocks.blockControls, this.elements.buttonMiddle)
//             if (navigator.platform == "iPhone") {
//                 DOMappendChildren(this.blocks.blockController, [this.elements.buttonController, this.elements.runnableTrack, this.elements.timer])
//             } else {
//                 DOMappendChildren(this.blocks.blockController, [this.elements.buttonController, this.elements.volume.volumeSection, this.elements.runnableTrack, this.elements.timer])
//             }
//         }
    
//         makeElement(type, modifier) {
//             if (type == "button") {
//                 const element = DOMelementWithClass("button", "videoplayer-control")
//                 if (modifier == "action") {
//                     const elementObjectPlay = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--play"])
//                     elementObjectPlay.setAttribute("viewBox", "0 0 175 200");
//                     elementObjectPlay.dataset.action = "play";
    
//                     const playPath = DOMelementWithClass("path")
//                     playPath.setAttribute("d", "M0 0 L175 100 L0 200Z");
//                     DOMappendChild(elementObjectPlay, playPath)
    
//                     const elementObjectPause = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--pause"])
//                     elementObjectPause.setAttribute("viewBox", "0 0 175 200");
//                     elementObjectPause.dataset.action = "pause";
    
//                     const pauseRectOne = DOMelementWithClass("rect");
//                     pauseRectOne.setAttribute("height", "200");
//                     pauseRectOne.setAttribute("width", "65");
    
//                     const pauseRectTwo = DOMelementWithClass("rect");
//                     pauseRectTwo.setAttribute("height", "200");
//                     pauseRectTwo.setAttribute("width", "65");
//                     pauseRectTwo.setAttribute("x", "110");
//                     DOMappendChildren(elementObjectPause, [pauseRectOne, pauseRectTwo])
    
//                     const elementObjectLoading = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--loading"])
//                     elementObjectLoading.setAttribute("viewBox", "0 0 175 200");
    
//                     const loadingCircle = DOMelementWithClass("circle")
//                     loadingCircle.setAttribute("cx", "87.5");
//                     loadingCircle.setAttribute("cy", "100");
//                     loadingCircle.setAttribute("r", "75");
//                     DOMappendChild(elementObjectLoading, loadingCircle);
    
    
//                     DOMappendChildren(element, [elementObjectPlay, elementObjectPause, elementObjectLoading])
//                     return element
//                 } else if (modifier == "volume") {
//                     element.classList.add("videoplayer-control--volume")
    
//                     const elementObjectVolume = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--volume"])
//                     elementObjectVolume.setAttribute("viewBox", "0 0 558 560");
    
    
//                     const speakerBase = DOMelementWithClass("path", ["videoplayer-control__icon-path", "videoplayer-control__icon-path--base"]);
//                     speakerBase.setAttribute("d", "M0 188.5V371.5H121.778L274 524V36L121.778 188.5H0Z");
    
//                     const speakerPath = DOMelementWithClass("path", ["videoplayer-control__icon-path", "videoplayer-control__icon-path--low"]);
//                     speakerPath.setAttribute("d", "M421 280C421 224.331 389.995 175.684 345 152V209.535C360.118 228.208 369.322 252.908 369.322 280C369.322 307.092 360.109 331.763 345 350.466V408C389.995 386.24 421 336.646 421 280Z");
    
//                     const speakerPathBig = DOMelementWithClass("path", ["videoplayer-control__icon-path", "videoplayer-control__icon-path--high"]);
//                     speakerPathBig.setAttribute("d", "M345 0V65.7736C432.936 93.2328 497.143 178.806 497.143 280C497.143 381.194 432.936 466.777 345 494.236V560C467.016 530.953 558 416.653 558 280C558 143.347 467.016 29.0572 345 0Z");
    
//                     const speakerPathMute = DOMelementWithClass("path", ["videoplayer-control__icon-path", "videoplayer-control__icon-path--mute"]);
//                     speakerPathMute.setAttribute("d", "M414.622 280.126L335.35 359.398L366.697 390.745L445.969 311.473L525.422 390.926L556.769 359.578L477.317 280.126L556.873 200.569L525.526 169.222L445.969 248.778L366.594 169.402L335.246 200.75L414.622 280.126Z");
    
//                     DOMappendChildren(elementObjectVolume, [speakerBase, speakerPath, speakerPathBig, speakerPathMute])
//                     DOMappendChild(element, elementObjectVolume)
//                     return element
//                 }
//             } else if (type == "runnabletrack") {
//                 const runnableTrack = DOMelementWithClass("input", ["videoplayer-runnabletrack"])
//                 // const runnableTrack_Track = DOMelementWithClass("input", ["videoplayer-runnabletrack__track", "videoplayer-runnabletrack__track--big"])
//                 runnableTrack.setAttribute("type", "range");
//                 runnableTrack.setAttribute("min", "0");
//                 runnableTrack.setAttribute("max", "100");
    
//                 if (modifier == "time") {
//                     runnableTrack.classList.add("videoplayer-runnabletrack--time")
//                     runnableTrack.setAttribute("value", 0);
//                     runnableTrack.setAttribute("step", 0.000001);
//                 }
    
//                 if (modifier == "volume") {
//                     runnableTrack.classList.add("videoplayer-runnabletrack--volume")
//                     runnableTrack.setAttribute("value", 50)
//                     runnableTrack.setAttribute("orient", "vertical")
//                 }
    
//                 // DOMappendChild(runnableTrack ,runnableTrack_Track);
//                 return runnableTrack;
//             } else if (type == "volume") {
//                 const volumeSection = DOMelementWithClass("section", "videoplayer-volume")
//                 const volumeButton = this.makeElement("button", "volume")
//                 volumeButton.dataset.volume = 2;
//                 const volumeTrack = this.makeElement("runnabletrack", "volume")
    
//                 DOMappendChildren(
//                     volumeSection,
//                     [
//                         volumeButton,
//                         volumeTrack
//                     ]
//                 )
//                 const returnedElement = {
//                     volumeSection,
//                     volumeButton,
//                     volumeTrack
//                 }
//                 return returnedElement
//             } else if (type == "timer") {
//                 const timer = DOMelementWithClass("p", "videoplayer-timer")
//                 this.timeManager(timer, this.node.currentTime)
    
//                 return timer
//             } else if (type == "stylesheet") {
//                 const styleSheet = DOMelementWithClass("style", "videoplayer-stylesheet")
//                 styleSheet.setAttribute("type", "text/css")
//                 styleSheet.textContent = `/* This file is created for a videoplayer ${this.id} */`
//                 return styleSheet
//             } else if (type == "fullscreen") {
//                 const element = DOMelementWithClass("button", ["videoplayer-control", "videoplayer-control--fullscreen"])
    
//                 const elementSvgFullScreenOpen = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--fs-open"])
//                 elementSvgFullScreenOpen.setAttribute("viewBox", "0 0 219 164");
                
//                 const elementPathFullScreenOpen = DOMelementWithClass("path")
//                 elementPathFullScreenOpen.setAttribute("d", "M0 58V30V0H30H93V30H30V58H0ZM219 106V134V164H189H126V134H189V106H219ZM219 30V58H189V30H126V0H189H219V30ZM0 106V134V164H30H93V134H30V106H0Z");
//                 DOMappendChild(elementSvgFullScreenOpen, elementPathFullScreenOpen)
                
//                 const elementSvgFullScreenClose = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--fs-close"])
//                 elementSvgFullScreenClose.setAttribute("viewBox", "0 0 219 164");
                
//                 const elementPathFullScreenClose = DOMelementWithClass("path")
//                 elementPathFullScreenClose.setAttribute("d", "M93 0V28V58H63H0V28H63V0H93ZM126 164V136V106H156H219V136H156V164H126ZM126 28V0H156V28H219V58H156H126V28ZM93 164V136V106H63H0V136H63V164H93Z");
//                 DOMappendChild(elementSvgFullScreenClose, elementPathFullScreenClose)
    
                
//                 DOMappendChildren(element, [elementSvgFullScreenOpen, elementSvgFullScreenClose])
//                 return element;
//             }
//         }
    
//         timeManager(node, time) {
//             let currentTime = formatTime(time);
//             const endTime = formatTime(this.node.duration);
//             const countDown = currentTime + "/" + endTime;
//             node.textContent = countDown;
//         }
    
//         getDefaultStyling() {
//             var computedStyle = window.getComputedStyle(this.node);
//             var inlineStyles = this.node.style;
//             var styles = {};
//             for (var i = 0; i < computedStyle.length; i++) {
//                 var property = computedStyle[i];
//                 var value = computedStyle.getPropertyValue(property);
//                 var isUserStyled = inlineStyles.getPropertyValue(property) !== "";
//                 if (isUserStyled) {
//                     var camelCasedProperty = property.replace(/([-_][a-z])/gi, function (group) {
//                         return group.toUpperCase()
//                             .replace('-', '')
//                             .replace('_', '');
//                     });
//                     styles[camelCasedProperty] = value;
//                 }
//             }
//             return styles;
//         }
    
//         videoAction(action, event) {
//             if (action == "play") {
//                 if (event?.type == "ended") {
//                     clearInterval(this.raceInterval)
//                     this.blocks.parentNode.dataset.state = "paused"
//                 } else if (this.node.paused) {
//                     this.node.play()
//                     this.blocks.parentNode.dataset.state = "playing"
//                     this.raceInterval = setInterval(() => {
//                         this.videoAction("timer")
//                         this.videoAction("buffer")
//                     }, 100)
//                 } else if (!this.node.paused) {
//                     this.node.pause()
//                     clearInterval(this.raceInterval)
//                     this.blocks.parentNode.dataset.state = "paused"
//                 }
//             } else if (action == "loading") {
//                 if (event?.type == "canplay") {
//                     if (!this.node.paused) {
//                         this.blocks.parentNode.dataset.state = "playing";
//                     } else if (this.node.paused) {
//                         this.blocks.parentNode.dataset.state = "paused";
//                     }
//                 } else if (event?.type == "waiting") {
//                     this.blocks.parentNode.dataset.state = "loading";
//                 } else if (event?.type == "stalled") {
//                     this.blocks.parentNode.dataset.state = "loading";
//                 }
//             } else if (action == "timer") {
//                 let style;
//                 let timePercentage;
    
//                 if (event?.type == "input") {
//                     if (!this.node.paused) {
//                         this.videoAction("play")
//                     }
//                     timePercentage = intToProcent((this.node.duration * (this.elements.runnableTrack.value / 100)), this.node.duration)
//                     const timeCount = (this.node.duration * (this.elements.runnableTrack.value / 100));
//                     this.timeManager(this.elements.timer, timeCount)
//                 } else if (event?.type == "change") {
//                     if (this.node.paused) {
//                         this.videoAction("play")
//                         const timeCount = (this.node.duration * (this.elements.runnableTrack.value / 100));
//                         timePercentage = intToProcent((this.node.duration * (this.elements.runnableTrack.value / 100)), this.node.duration);
//                         this.node.currentTime = timeCount;
//                     }
//                 } else if (event?.type == "canplay") {
//                     timePercentage = intToProcent((this.node.duration * (this.elements.runnableTrack.value / 100)), this.node.duration)
//                 } else if (event?.type == "canplaythrough") {
//                     timePercentage = intToProcent((this.node.duration * (this.elements.runnableTrack.value / 100)), this.node.duration)
//                 } else if (!event) {
//                     this.timeManager(this.elements.timer, this.node.currentTime);
//                     timePercentage = intToProcent(this.node.currentTime, this.node.duration);
//                     this.elements.runnableTrack.value = timePercentage;
//                 }
    
//                 // BETTER SOLUTION THAN CUSTOM STYLESHEET or INCLUDE ALSO THEME STYLING 
//                 style = `background:linear-gradient(to right, var(--hover-color) ${timePercentage}%, grey ${timePercentage}%, grey ${this.buffered}%, black ${this.buffered}%, black 100%) !important;`
//                 const styleItem = `.videoplayer-container-${this.id} .videoplayer-runnabletrack--time::-webkit-slider-runnable-track{${style}}`
//                 this.blocks.styleSheet.textContent = styleItem;
//             } else if (action == "volume") {
//                 let value;
//                 let trackValue = this.elements.volume.volumeTrack.value;
//                 if (event.type == "input") {
//                     value = trackValue
//                 } else if (event.type == "click" || event.type == "keydown") {
//                     if (trackValue != 0) {
//                         value = 0
//                         this.oldValue = trackValue;
//                         this.elements.volume.volumeTrack.value = value
//                     } else if (trackValue == 0) {
//                         if (this.oldValue) {
//                             value = this.oldValue
//                         } else if (!this.oldValue) {
//                             value = 50
//                         } else if (this.oldValue == 0) {
//                             value = 50
//                         }
//                         this.elements.volume.volumeTrack.value = value
//                         this.oldValue = trackValue
//                     }
//                 }
//                 this.node.volume = value / 100
//                 const inputtedValue = value == 0 ? 0 : value <= 15 ? 1 : value <= 60 ? 2 : 3
//                 if (inputtedValue == this.elements.volume.volumeButton.dataset.volume) {
//                     return
//                 }
//                 this.elements.volume.volumeButton.dataset.volume = inputtedValue
//             } else if (action == "buffer") {
//                 var buffered = this.node.buffered;
//                 var duration = this.node.duration;
//                 var bufferedTime = 0;
//                 if (buffered.length > 0) {
//                     bufferedTime = buffered.end(buffered.length - 1);
//                 }
//                 var percentBuffered = (bufferedTime / duration) * 100;
//                 this.buffered = percentBuffered;
//             } else if (action == "fullscreen") {
//                 let element = this.blocks.parentNode;
//                 const request = () => {
//                     element.classList.add("videoplayer-container--fullscreen")
//                     Object.keys(this.defaultStyling).forEach((key) => {
//                         this.node.style[key] = "unset"
//                     })
//                     if (element.requestFullscreen) {
//                         return element.requestFullscreen()
    
//                     } 
//                     if (element.mozRequestFullscreen) {
//                         return element.mozRequestFullscreen()
    
//                     } else if (element.msRequestFullscreen) {
//                         return element.msRequestFullscreen()
    
//                     } 
//                     else if (this.node.webkitEnterFullscreen) {
//                         return this.node.webkitEnterFullscreen()
//                     }
//                 }
    
//                 const cancel = () => {
//                     Object.keys(this.defaultStyling).forEach((key) => {
//                         this.node.style[key] = this.defaultStyling[key]
//                     })
//                     element.classList.remove("videoplayer-container--fullscreen")
//                     if(isFullScreen()){
//                         if(document.exitFullscreen) {
//                             document.exitFullscreen();
//                         } else if(document.mozCancelFullScreen) {
//                             document.mozCancelFullScreen();
//                         } else if(document.webkitExitFullscreen) {
//                             document.webkitExitFullscreen();
//                         }
//                     }
//                 }
            
//                 const isFullScreen = () => {
//                     return document.isFullScreen || document.msIsFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
//                 }
            
//                 const toggle = () => {
//                     if (isFullScreen() || event == "close") {
//                         return cancel()
//                     } else { 
//                         return request()
//                     };
//                 }
//                 toggle()
//             }
//         }
    
//         render() {
//             this.init()
//             this.bindEvents()
//         }
// }


const errorMessages = {
    warningStart: '"%c" +',
    warningEnd: ', "color: yellow; font-size: 40px; font-weight: bold;"',
    ErrorNoVideo: "There is no <video> element with the class name of video-object.\n\nFIX: Create a <video> element with a class of video-object \n\n\nEXAMPLE (best practice):\n<video class='video-object'>\n   <source src='./video/source.mp4' type='video/mp4'>\n</video>",
    noVidSettings: "Make sure the data-settings dataset is set on as an Object \n\nTry <video ... data-setting='{}'> </video> \n\n\nThe default value will now be used instead (default style='default')",
    wrongTheme: "The theme you tried to use is undefined. \nTry eg. 'flasy', 'flashy-minimal', 'box', 'box-minimal', 'minimal' or 'default' \n\nMore styles coming very soon.."
};

const themes = ["flashy", "flashy-minimal", "box", "box-minimal", "minimal", "default"]

var Videos = document.querySelectorAll(".videoplayer");

class videoplayerJS {
    constructor(node, index) {
        this.node = node
        this.defaultStyling = this.getDefaultStyling();
        this.id = index + 1
        this.settings = getVideoSettings(this.node)
        if (this.settings) {
            this.settings?.dev == true ? this.node.controls = true : this.controls = false;
            if (this.settings?.theme != undefined) {
                const item = themes.find(element => element == this.settings?.theme)
                if(item) {
                    this.theme = this.settings.theme
                } else {
                    warningMes(errorMessages.wrongTheme)
                    this.theme = "default"
                }}
            } else {
                this.theme = "default";
            }                    
        // CHECK if user uses a phone in that case use the
        this.render()
    }

    bindEvents() {
        // LOAD METADATA
        this.node.addEventListener("loadedmetadata", (e) => {
            this.timeManager(this.elements.timer, this.node.currentTime)
        })

        // ACTION (play/pause/end)
        this.elements.buttonMiddle.addEventListener("click", (e) => {
            this.videoAction("play", e)
        })
        this.elements.buttonController.addEventListener("click", (e) => {
            this.videoAction("play", e)
        })

        this.node.addEventListener("ended", (e) => {
            this.videoAction("play", e)
        })

        this.node.addEventListener("click", (e) => {
            this.videoAction("play", e)
        })

        // TIME + LOADING
        this.node.addEventListener("stalled", (e) => {
            this.videoAction("loading", e)
        })

        this.node.addEventListener("waiting", (e) => {
            this.videoAction("loading", e)
        })

        this.node.addEventListener("canplay", (e) => {
            this.videoAction("buffer", e)
            this.videoAction("timer", e)
            this.videoAction("loading", e)
        })

        this.node.addEventListener("canplaythrough", (e) => {
            this.videoAction("buffer", e)
            this.videoAction("timer", e)
        })

        this.elements.runnableTrack.addEventListener("input", (e) => {
            this.videoAction("timer", e)
        })

        this.elements.runnableTrack.addEventListener("change", (e) => {
            this.videoAction("timer", e)
        })

        // VOLUME
        this.elements.volume.volumeButton.addEventListener("click", (e) => {
            this.videoAction("volume", e)
        })

        this.elements.volume.volumeTrack.addEventListener("input", (e) => {
            this.videoAction("volume", e)
        })


        // FULL SCREEN
        this.elements.fullscreen.addEventListener("click", (e) => {
            this.videoAction("fullscreen", e)
        })

        document.addEventListener("fullscreenchange", (e) => {
            let isFullScreen = document.isFullScreen || document.msIsFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
            if(e.target == this.node || e.target == this.blocks.parentNode){
                if(!isFullScreen) {
                    this.videoAction("fullscreen", "close") 
                }
            }
        })

        this.node.addEventListener("dblclick", () => {
            this.videoAction("fullscreen") 
        })

        // KEY EVENTS
        document.addEventListener("keydown", (e) => {
            switch (e.key.toLowerCase()) {
                case "m":
                    e.preventDefault()
                    this.videoAction("volume", e)
                    break;
                
                case "f":
                    this.videoAction("fullscreen", "close")
                    
                default:
                    break;
            }

        })
    }

    init() {
        if (!this.node.poster) {
            this.node.style.background = "#333"
        }
        
        
        this.blocks = this.makeBlockElements()
        this.elements = this.makeElementElements()
        this.appendElements()
        if(typeof this.settings.colorscheme === "string") {
            this.blocks.parentNode.style.setProperty("--base-color", "rgba(11,11,11, .75)")
            this.blocks.parentNode.style.setProperty("--tile-color", this.settings.colorscheme || "rgba(220, 220, 220, 1)")
            this.blocks.parentNode.style.setProperty("--hover-color",  colorScheme(this.settings.colorscheme) || "rgba(200, 200, 200, 1)")
        } else {
            this.blocks.parentNode.style.setProperty("--base-color", this.settings.colorscheme ? this.settings.colorscheme[0] : "rgba(11,11,11, .75)")
            this.blocks.parentNode.style.setProperty("--tile-color", this.settings.colorscheme ? this.settings.colorscheme[1] : "rgba(220, 220, 220, 1)")
            this.blocks.parentNode.style.setProperty("--hover-color", this.settings.colorscheme ? colorScheme(this.settings.colorscheme[1]) : "rgba(200, 200, 200, 1)")
        }
    }

    makeBlockElements() {
        const parentNode = assignParent("section", ["videoplayer-container", `videoplayer-container-${this.id}`], this.node, this.theme)
        const blockControls = DOMelementWithClass("section", "videoplayer-controls"); // middle
        const blockController = DOMelementWithClass("section", "videoplayer-controller"); // bottom
        const styleSheet = this.makeElement("stylesheet")
        return {
            parentNode,
            blockControls,
            blockController,
            styleSheet
        }
    }

    makeElementElements() {
        const buttonMiddle = this.makeElement("button", "action");
        const buttonController = this.makeElement("button", "action");
        const runnableTrack = this.makeElement("runnabletrack", "time")
        const volume = this.makeElement("volume")
        const timer = this.makeElement("timer")
        const fullscreen = this.makeElement("fullscreen")
        return {
            buttonMiddle,
            buttonController,
            runnableTrack,
            volume,
            timer,
            fullscreen
        }
    }

    appendElements() {
        document.head.append(this.blocks.styleSheet)
        DOMappendChildren(this.blocks.parentNode, [this.blocks.blockControls, this.blocks.blockController, this.elements.fullscreen])
        DOMappendChild(this.blocks.blockControls, this.elements.buttonMiddle)
        if (navigator.platform == "iPhone") {
            DOMappendChildren(this.blocks.blockController, [this.elements.buttonController, this.elements.runnableTrack, this.elements.timer])
        } else {
            DOMappendChildren(this.blocks.blockController, [this.elements.buttonController, this.elements.volume.volumeSection, this.elements.runnableTrack, this.elements.timer])
        }
    }

    makeElement(type, modifier) {
        if (type == "button") {
            const element = DOMelementWithClass("button", "videoplayer-control")
            if (modifier == "action") {
                const elementObjectPlay = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--play"])
                elementObjectPlay.setAttribute("viewBox", "0 0 175 200");
                elementObjectPlay.dataset.action = "play";

                const playPath = DOMelementWithClass("path")
                playPath.setAttribute("d", "M0 0 L175 100 L0 200Z");
                DOMappendChild(elementObjectPlay, playPath)

                const elementObjectPause = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--pause"])
                elementObjectPause.setAttribute("viewBox", "0 0 175 200");
                elementObjectPause.dataset.action = "pause";

                const pauseRectOne = DOMelementWithClass("rect");
                pauseRectOne.setAttribute("height", "200");
                pauseRectOne.setAttribute("width", "65");

                const pauseRectTwo = DOMelementWithClass("rect");
                pauseRectTwo.setAttribute("height", "200");
                pauseRectTwo.setAttribute("width", "65");
                pauseRectTwo.setAttribute("x", "110");
                DOMappendChildren(elementObjectPause, [pauseRectOne, pauseRectTwo])

                const elementObjectLoading = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--loading"])
                elementObjectLoading.setAttribute("viewBox", "0 0 175 200");

                const loadingCircle = DOMelementWithClass("circle")
                loadingCircle.setAttribute("cx", "87.5");
                loadingCircle.setAttribute("cy", "100");
                loadingCircle.setAttribute("r", "75");
                DOMappendChild(elementObjectLoading, loadingCircle);


                DOMappendChildren(element, [elementObjectPlay, elementObjectPause, elementObjectLoading])
                return element
            } else if (modifier == "volume") {
                element.classList.add("videoplayer-control--volume")

                const elementObjectVolume = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--volume"])
                elementObjectVolume.setAttribute("viewBox", "0 0 558 560");


                const speakerBase = DOMelementWithClass("path", ["videoplayer-control__icon-path", "videoplayer-control__icon-path--base"]);
                speakerBase.setAttribute("d", "M0 188.5V371.5H121.778L274 524V36L121.778 188.5H0Z");

                const speakerPath = DOMelementWithClass("path", ["videoplayer-control__icon-path", "videoplayer-control__icon-path--low"]);
                speakerPath.setAttribute("d", "M421 280C421 224.331 389.995 175.684 345 152V209.535C360.118 228.208 369.322 252.908 369.322 280C369.322 307.092 360.109 331.763 345 350.466V408C389.995 386.24 421 336.646 421 280Z");

                const speakerPathBig = DOMelementWithClass("path", ["videoplayer-control__icon-path", "videoplayer-control__icon-path--high"]);
                speakerPathBig.setAttribute("d", "M345 0V65.7736C432.936 93.2328 497.143 178.806 497.143 280C497.143 381.194 432.936 466.777 345 494.236V560C467.016 530.953 558 416.653 558 280C558 143.347 467.016 29.0572 345 0Z");

                const speakerPathMute = DOMelementWithClass("path", ["videoplayer-control__icon-path", "videoplayer-control__icon-path--mute"]);
                speakerPathMute.setAttribute("d", "M414.622 280.126L335.35 359.398L366.697 390.745L445.969 311.473L525.422 390.926L556.769 359.578L477.317 280.126L556.873 200.569L525.526 169.222L445.969 248.778L366.594 169.402L335.246 200.75L414.622 280.126Z");

                DOMappendChildren(elementObjectVolume, [speakerBase, speakerPath, speakerPathBig, speakerPathMute])
                DOMappendChild(element, elementObjectVolume)
                return element
            }
        } else if (type == "runnabletrack") {
            const runnableTrack = DOMelementWithClass("input", ["videoplayer-runnabletrack"])
            // const runnableTrack_Track = DOMelementWithClass("input", ["videoplayer-runnabletrack__track", "videoplayer-runnabletrack__track--big"])
            runnableTrack.setAttribute("type", "range");
            runnableTrack.setAttribute("min", "0");
            runnableTrack.setAttribute("max", "100");

            if (modifier == "time") {
                runnableTrack.classList.add("videoplayer-runnabletrack--time")
                runnableTrack.setAttribute("value", 0);
                runnableTrack.setAttribute("step", 0.000001);
            }

            if (modifier == "volume") {
                runnableTrack.classList.add("videoplayer-runnabletrack--volume")
                runnableTrack.setAttribute("value", 50)
                runnableTrack.setAttribute("orient", "vertical")
            }

            // DOMappendChild(runnableTrack ,runnableTrack_Track);
            return runnableTrack;
        } else if (type == "volume") {
            const volumeSection = DOMelementWithClass("section", "videoplayer-volume")
            const volumeButton = this.makeElement("button", "volume")
            volumeButton.dataset.volume = 2;
            const volumeTrack = this.makeElement("runnabletrack", "volume")

            DOMappendChildren(
                volumeSection,
                [
                    volumeButton,
                    volumeTrack
                ]
            )
            const returnedElement = {
                volumeSection,
                volumeButton,
                volumeTrack
            }
            return returnedElement
        } else if (type == "timer") {
            const timer = DOMelementWithClass("p", "videoplayer-timer")
            this.timeManager(timer, this.node.currentTime)

            return timer
        } else if (type == "stylesheet") {
            const styleSheet = DOMelementWithClass("style", "videoplayer-stylesheet")
            styleSheet.setAttribute("type", "text/css")
            styleSheet.textContent = `/* This file is created for a videoplayer ${this.id} */`
            return styleSheet
        } else if (type == "fullscreen") {
            const element = DOMelementWithClass("button", ["videoplayer-control", "videoplayer-control--fullscreen"])

            const elementSvgFullScreenOpen = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--fs-open"])
            elementSvgFullScreenOpen.setAttribute("viewBox", "0 0 219 164");
            
            const elementPathFullScreenOpen = DOMelementWithClass("path")
            elementPathFullScreenOpen.setAttribute("d", "M0 58V30V0H30H93V30H30V58H0ZM219 106V134V164H189H126V134H189V106H219ZM219 30V58H189V30H126V0H189H219V30ZM0 106V134V164H30H93V134H30V106H0Z");
            DOMappendChild(elementSvgFullScreenOpen, elementPathFullScreenOpen)
            
            const elementSvgFullScreenClose = DOMelementWithClass("svg", ["videoplayer-control__icon", "videoplayer-control__icon--fs-close"])
            elementSvgFullScreenClose.setAttribute("viewBox", "0 0 219 164");
            
            const elementPathFullScreenClose = DOMelementWithClass("path")
            elementPathFullScreenClose.setAttribute("d", "M93 0V28V58H63H0V28H63V0H93ZM126 164V136V106H156H219V136H156V164H126ZM126 28V0H156V28H219V58H156H126V28ZM93 164V136V106H63H0V136H63V164H93Z");
            DOMappendChild(elementSvgFullScreenClose, elementPathFullScreenClose)

            
            DOMappendChildren(element, [elementSvgFullScreenOpen, elementSvgFullScreenClose])
            return element;
        }
    }

    timeManager(node, time) {
        let currentTime = formatTime(time);
        const endTime = formatTime(this.node.duration);
        const countDown = currentTime + "/" + endTime;
        node.textContent = countDown;
    }

    getDefaultStyling() {
        var computedStyle = window.getComputedStyle(this.node);
        var inlineStyles = this.node.style;
        var styles = {};
        for (var i = 0; i < computedStyle.length; i++) {
            var property = computedStyle[i];
            var value = computedStyle.getPropertyValue(property);
            var isUserStyled = inlineStyles.getPropertyValue(property) !== "";
            if (isUserStyled) {
                var camelCasedProperty = property.replace(/([-_][a-z])/gi, function (group) {
                    return group.toUpperCase()
                        .replace('-', '')
                        .replace('_', '');
                });
                styles[camelCasedProperty] = value;
            }
        }
        return styles;
    }

    videoAction(action, event) {
        if (action == "play") {
            if (event?.type == "ended") {
                clearInterval(this.raceInterval)
                this.blocks.parentNode.dataset.state = "paused"
            } else if (this.node.paused) {
                this.node.play()
                this.blocks.parentNode.dataset.state = "playing"
                this.raceInterval = setInterval(() => {
                    this.videoAction("timer")
                    this.videoAction("buffer")
                }, 100)
            } else if (!this.node.paused) {
                this.node.pause()
                clearInterval(this.raceInterval)
                this.blocks.parentNode.dataset.state = "paused"
            }
        } else if (action == "loading") {
            if (event?.type == "canplay") {
                if (!this.node.paused) {
                    this.blocks.parentNode.dataset.state = "playing";
                } else if (this.node.paused) {
                    this.blocks.parentNode.dataset.state = "paused";
                }
            } else if (event?.type == "waiting") {
                this.blocks.parentNode.dataset.state = "loading";
            } else if (event?.type == "stalled") {
                this.blocks.parentNode.dataset.state = "loading";
            }
        } else if (action == "timer") {
            let style;
            let timePercentage;

            if (event?.type == "input") {
                if (!this.node.paused) {
                    this.videoAction("play")
                }
                timePercentage = intToProcent((this.node.duration * (this.elements.runnableTrack.value / 100)), this.node.duration)
                const timeCount = (this.node.duration * (this.elements.runnableTrack.value / 100));
                this.timeManager(this.elements.timer, timeCount)
            } else if (event?.type == "change") {
                if (this.node.paused) {
                    this.videoAction("play")
                    const timeCount = (this.node.duration * (this.elements.runnableTrack.value / 100));
                    timePercentage = intToProcent((this.node.duration * (this.elements.runnableTrack.value / 100)), this.node.duration);
                    this.node.currentTime = timeCount;
                }
            } else if (event?.type == "canplay") {
                timePercentage = intToProcent((this.node.duration * (this.elements.runnableTrack.value / 100)), this.node.duration)
            } else if (event?.type == "canplaythrough") {
                timePercentage = intToProcent((this.node.duration * (this.elements.runnableTrack.value / 100)), this.node.duration)
            } else if (!event) {
                this.timeManager(this.elements.timer, this.node.currentTime);
                timePercentage = intToProcent(this.node.currentTime, this.node.duration);
                this.elements.runnableTrack.value = timePercentage;
            }

            // BETTER SOLUTION THAN CUSTOM STYLESHEET or INCLUDE ALSO THEME STYLING 
            style = `background:linear-gradient(to right, var(--hover-color) ${timePercentage}%, grey ${timePercentage}%, grey ${this.buffered}%, black ${this.buffered}%, black 100%) !important;`
            const styleItem = `.videoplayer-container-${this.id} .videoplayer-runnabletrack--time::-webkit-slider-runnable-track{${style}}`
            this.blocks.styleSheet.textContent = styleItem;
        } else if (action == "volume") {
            let value;
            let trackValue = this.elements.volume.volumeTrack.value;
            if (event.type == "input") {
                value = trackValue
            } else if (event.type == "click" || event.type == "keydown") {
                if (trackValue != 0) {
                    value = 0
                    this.oldValue = trackValue;
                    this.elements.volume.volumeTrack.value = value
                } else if (trackValue == 0) {
                    if (this.oldValue) {
                        value = this.oldValue
                    } else if (!this.oldValue) {
                        value = 50
                    } else if (this.oldValue == 0) {
                        value = 50
                    }
                    this.elements.volume.volumeTrack.value = value
                    this.oldValue = trackValue
                }
            }
            this.node.volume = value / 100
            const inputtedValue = value == 0 ? 0 : value <= 15 ? 1 : value <= 60 ? 2 : 3
            if (inputtedValue == this.elements.volume.volumeButton.dataset.volume) {
                return
            }
            this.elements.volume.volumeButton.dataset.volume = inputtedValue
        } else if (action == "buffer") {
            var buffered = this.node.buffered;
            var duration = this.node.duration;
            var bufferedTime = 0;
            if (buffered.length > 0) {
                bufferedTime = buffered.end(buffered.length - 1);
            }
            var percentBuffered = (bufferedTime / duration) * 100;
            this.buffered = percentBuffered;
        } else if (action == "fullscreen") {
            let element = this.blocks.parentNode;
            const request = () => {
                element.classList.add("videoplayer-container--fullscreen")
                Object.keys(this.defaultStyling).forEach((key) => {
                    this.node.style[key] = "unset"
                })
                if (element.requestFullscreen) {
                    return element.requestFullscreen()

                } 
                if (element.mozRequestFullscreen) {
                    return element.mozRequestFullscreen()

                } else if (element.msRequestFullscreen) {
                    return element.msRequestFullscreen()

                } 
                else if (this.node.webkitEnterFullscreen) {
                    return this.node.webkitEnterFullscreen()
                }
            }

            const cancel = () => {
                Object.keys(this.defaultStyling).forEach((key) => {
                    this.node.style[key] = this.defaultStyling[key]
                })
                element.classList.remove("videoplayer-container--fullscreen")
                if(isFullScreen()){
                    if(document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if(document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if(document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            }
        
            const isFullScreen = () => {
                return document.isFullScreen || document.msIsFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
            }
        
            const toggle = () => {
                if (isFullScreen() || event == "close") {
                    return cancel()
                } else { 
                    return request()
                };
            }
            toggle()
        }
    }

    render() {
        this.init()
        this.bindEvents()
    }
}

if (Videos) {
    [...Videos].forEach((node, index) => new videoplayerJS(node, index))
}


function DOMelement(element) {
    if (element == "path" || element == "svg" || element == "rect" || element == "polygon" || element == "circle") {
        return document.createElementNS('http://www.w3.org/2000/svg', element);
    }
    return document.createElement(element);
}

function DOMaddClass(element, className) {
    const newElement = DOMelement(element)
    newElement.classList.add(className)
    return newElement
}

function DOMaddClasses(element, classNames) {
    const newElement = DOMelement(element)
    classNames.map(className => (
        newElement.classList.add(className)
    ))
    return newElement
}

function getVideoSettings(element) {
    if (element.dataset.settings) {
        const parsedData = JSON.parse(
            element?.dataset?.settings?.replaceAll(`'`, `"`) ?
            element?.dataset?.settings?.replaceAll(`'`, `"`) :
            "[]"
        );
        return parsedData
    }
}

function assignParent(parentElement, classNames, element, theme) {
    const container = DOMelementWithClass(parentElement, classNames); // container of the videoplayer -> used for css purpose.
    element.parentNode.insertBefore(container, element)
    container.appendChild(element)
    if (theme) {
        container.classList.add(`videoplayer_theme--${theme}`)
    }
    return container;
}


/**
 * @param {String} element
 * @param {Array || String || Object} classNames
 */
function DOMelementWithClass(element, classNames) {
    if (classNames) {
        if (typeof classNames === "string") {
            return DOMaddClass(element, classNames)
        } else if (Array.isArray(classNames)) {
            return DOMaddClasses(element, classNames)
        } else if (typeof classNames === "object") {
            errorMes("Objects are not supported in this function")
            return element
        } else {
            errorMes("Unknown type of variable, should be an Array or an String")
        }
    } else {
        return DOMelement(element)
    }
}

function DOMappendChild(parent, child) {
    return parent.appendChild(child)
}

function DOMappendChildren(element, childrenArray) {
    childrenArray.map(child => (
        element.appendChild(child)
    ))
    return element;
}

function DOMquerySelector(element) {
    return document.querySelector(`${element}`)
}

function formatTime(timestamp) {
    timestamp = ~~(timestamp)
    let hours = ~~(timestamp / 3600);
    timestamp = ~~(timestamp % 3600);
    let minutes = ~~(timestamp / 60);
    let seconds = ~~(timestamp % 60);
    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function intToProcent(amount, total) {
    const fullTime = total;
    const percentage = (((amount - fullTime) / fullTime) + 1) * 100;
    return percentage
}

function warningMes(message) {
    console.warn("%c" + `${message}`, "color: yellow; font-weight: bold;");
}

function errorMes(message) {
    console.error("%c" + `${message}`, "color: #FF3333; font-weight: bold;");
};

function colorScheme (color) {
    var colorValue = color
    const regexTEXT = /[a-z, A-Z]/;

    if (regexTEXT.test(color)) {
        if (!color.startsWith("rgb")) {
            colorValue = getCSSColorValue(color);
        }
    }
    if (colorValue.startsWith("rgb")) {
        var rgba = colorValue.match(/[\d.]+/g);
        var r = rgba[0],
            g = rgba[1],
            b = rgba[2],
            a = rgba[3] || 1;
        r = (r * 0.8) | 0;
        g = (g * 0.8) | 0;
        b = (b * 0.8) | 0;
        return `rgba(${r},${g},${b},${a})`;
    } else if (colorValue.startsWith("#")) {
        const secValue = colorValue.substring(1); // remove the "#" symbol
        var r = parseInt(secValue.substring(0,2), 16);
        var g = parseInt(secValue.substring(2,4), 16);
        var b = parseInt(secValue.substring(4,6), 16);
        
        r = (r * 0.8) | 0;
        g = (g * 0.8) | 0;
        b = (b * 0.8) | 0;

        newColor = "#" + (r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0"));

        return newColor;
    } else {
        warningMes("The colors you use must be RGB, RGBA, HEX, or a CSS color name");
    }
}

function getCSSColorValue(colorName) {
    var element = document.createElement("div");
    element.style.display = "none";
    element.style.color = colorName;
    document.body.appendChild(element);
    var computedColor = window.getComputedStyle(element).color;
    document.body.removeChild(element);
    return computedColor;
}