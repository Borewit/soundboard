import PlayMode from './model/play-mode';

export default class BoardRenderer {

  constructor(element, board) {
    this._element = element;
    this._board = board;
  }

  render() {
    let html = '';
    for ( let y = 0; y < this._board.rows; y++ ) {
      html += `<div class='row'>`;
      for ( let x = 0; x < this._board.cols; x++ ) {
        let sound  = this._board.getSound(x,y);
        let title, artist, colour, playMode;

        if ( sound ) {
          title    = sound.mp3File.getTag('title') || 'Unknown song';
          artist   = sound.mp3File.getTag('artist');
          colour   = sound.colour;
          playMode = sound.playMode;
        } else {
          title    = 'Drop an mp3 file here';
          artist   = '';
          colour   = 'gray';
          playMode = PlayMode.Disabled;
        }

        html += `
          <div class='sound ${sound ? 'loaded' : ''}'
               data-x='${x}' data-y='${y}'
               style='background-color: ${colour}'>
            ${sound ? `
              <div class='progress'></div>
              <div class='settings'>
                <button class='show-modes ${ playMode == PlayMode.Retrigger ? 'retrigger' :
                                             playMode == PlayMode.OneShot   ? 'oneshot'   :
                                             playMode == PlayMode.Gate      ? 'gate' : '' } active'></button>
                <div class='modes'>
                  <button data-mode='retrigger' class='retrigger ${playMode == PlayMode.Retrigger ? 'active' : ''}'></button>
                  <button data-mode='oneshot'   class='oneshot   ${playMode == PlayMode.OneShot   ? 'active' : ''}'></button>
                  <button data-mode='gate'      class='gate      ${playMode == PlayMode.Gate      ? 'active' : ''}'></button>
                </div>
                <button class='show-colours'></button>
                <div class='colours'>
                  <button class='colour blue'></button>
                  <button class='colour red'></button>
                  <button class='colour purple'></button>
                  <button class='colour cyan'></button>
                  <button class='colour yellow'></button>
                  <button class='colour green'></button>
                  <button class='colour orange'></button>
                  <!--<input type="text" length="10" value="${colour}"/><button class='save-colour'>Save</button>-->
                </div>
              </div>
            ` : ''}
            <div class='props'>
              <h1>${title}</h1>
              ${sound ? `
                <p>${artist}</p>
              ` : ''}
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }
    this._element.innerHTML = html;
  }

}
