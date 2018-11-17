import * as PIXI from 'pixi.js'

const view = document.getElementById('game') as HTMLCanvasElement
const app = new PIXI.Application({ view })

function loadAssets(assets: { name: string; src: string }[], callback: () => void) {
  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i]

    if (!PIXI.loader.resources[asset.name]) {
      PIXI.loader
        .add(asset.name, asset.src)
        .once('complete', () => callback())
        .load()
    } else if (i === assets.length - 1) {
      callback()
    }
  }
}

loadAssets([{ name: 'bunny', src: 'https://pixijs.io/examples/required/assets/basics/bunny.png' }], init)

function init() {
  console.log('Game started')

  const bunny = new PIXI.Sprite(PIXI.loader.resources.bunny.texture)

  bunny.x = app.renderer.width / 2
  bunny.y = app.renderer.height / 2

  bunny.anchor.x = 0.5
  bunny.anchor.y = 0.5

  app.stage.addChild(bunny)

  app.ticker.add(() => {
    bunny.rotation += 0.01
  })
}
