class Note{
    constructor(nSize, nPos, nState){
        this.noteSize = nSize;
        this.notePos = nPos;
        this.noteState = nState;
    }
    
    getPosAndStateColumn(x,gridHeight,noteSize){
        var posAndState = [];
        var posColumn = [];
        var stateColumn = [];
        for (var y=0;y<gridHeight;y+=noteSize){
            posColumn.push(createVector(x+noteSize/2,y+noteSize/2));
            stateColumn.push(0);
        }
        posAndState.push(posColumn);
        posAndState.push(stateColumn);
        return posAndState;
    }
    
    drawSingleNote(notes, x, y, i, j){
        var alpha = notes.noteState[i][j] * sin(x) * 200;
        var c1 = color(0,0,255,alpha);
        var c2 = color(255,255,0,alpha);
        var mix = lerpColor(c1, c2, map(i, 0, notes.notePos.length, 0, 1));
        fill(mix);
        var s = notes.noteState[i][j];
        ellipse(x, y, notes.noteSize*s, notes.noteSize*s);
    }
}

class Grid {
      /////////////////////////////////
      constructor(_w, _h) {
            this.gridWidth = _w;
            this.gridHeight = _h;
            this.notes = new Note(40, [], []);
            this.monoSynth = new p5.MonoSynth();

            // initalise grid structure and state
            for (var x=0;x<_w;x+=this.notes.noteSize){
                var posAndState = this.notes.getPosAndStateColumn(x,_h,this.notes.noteSize);
                this.notes.notePos.push(posAndState[0]);
                this.notes.noteState.push(posAndState[1]);
            }
      }
      /////////////////////////////////
      run(img) {
            img.loadPixels();
            this.findActiveNotes(img);
            this.drawActiveNotes(img);
      }
      /////////////////////////////////
      drawActiveNotes(img){
            // draw active notes
            fill(255);
            noStroke();
            for (var i=0;i<this.notes.notePos.length;i++){
                for (var j=0;j<this.notes.notePos[i].length;j++){
                    var x = this.notes.notePos[i][j].x;
                    var y = this.notes.notePos[i][j].y;
                    
                    if(this.notes.noteState[i][j] === 1){
                        // play sound on creation of note
                        let note = map(x, 0, img.width, 200, 500);
                        // volume is set to negative here so that the notes 
                        // are louder and softer with a higher and lower
                        // height respectively
                        let volume = map(y, 0, img.height, -0.55, -0.4);
                        userStartAudio();
                        this.monoSynth.play(note, -volume, 0, 1/10);
                    }
                    
                    if (this.notes.noteState[i][j]>0) {
                        this.notes.drawSingleNote(this.notes, x, y, i, j);
                    }
                    this.notes.noteState[i][j]-=0.05;
                    this.notes.noteState[i][j]=constrain(this.notes.noteState[i][j],0,1);
                }
            }
      }
      /////////////////////////////////
      findActiveNotes(img){
            for (var x = 0; x < img.width; x += 1) {
                for (var y = 0; y < img.height; y += 1) {
                    var index = (x + (y * img.width)) * 4;
                    var state = img.pixels[index];
                    if (state==0){ // if pixel is black (ie there is movement)
                            // find which note to activate
                            var screenX = map(x, 0, img.width, 0, this.gridWidth);
                            var screenY = map(y, 0, img.height, 0, this.gridHeight);
                            var i = int(screenX/this.notes.noteSize);
                            var j = int(screenY/this.notes.noteSize);
                            this.notes.noteState[i][j] = 1;
                    }
                }
            }
      }
}

