'use strict'

/*
 * adonis-framework
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const { ServiceProvider } = require('adonis-fold')

class AppProvider extends ServiceProvider {
  /**
   * Registering the env provider under
   * Adonis/Src/Env namespace.
   *
   * @method _registerEnv
   *
   * @return {void}
   *
   * @private
   */
  _registerEnv () {
    this.app.singleton('Adonis/Src/Env', (app) => {
      const Helpers = app.use('Adonis/Src/Helpers')
      const Env = require('../src/Env')
      return new Env(Helpers._appRoot)
    })
    this.app.alias('Adonis/Src/Env', 'Env')
  }

  /**
   * Registering the config provider under
   * Adonis/Src/Config namespace
   *
   * @method _registerConfig
   *
   * @return {void}
   *
   * @private
   */
  _registerConfig () {
    this.app.singleton('Adonis/Src/Config', (app) => {
      const Helpers = app.use('Adonis/Src/Helpers')
      const Config = require('../src/Config')
      return new Config(Helpers.configPath())
    })
    this.app.alias('Adonis/Src/Config', 'Config')
  }

  /**
   * Registering the request provider under
   * Adonis/Src/Request namespace
   *
   * @method _registerRequest
   *
   * @return {void}
   *
   * @private
   */
  _registerRequest () {
    this.app.bind('Adonis/Src/Request', () => {
      return require('../src/Request')
    })
  }

  /**
   * Registering the response provider under
   * Adonis/Src/Response namespace
   *
   * @method _registerResponse
   *
   * @return {void}
   *
   * @private
   */
  _registerResponse () {
    this.app.bind('Adonis/Src/Response', () => {
      return require('../src/Response')
    })
  }

  /**
   * Registering the route provider under
   * Adonis/Src/Route namespace
   *
   * @method _registerRoute
   *
   * @return {void}
   *
   * @private
   */
  _registerRoute () {
    this.app.singleton('Adonis/Src/Route', () => {
      return require('../src/Route/Manager')
    })
    this.app.alias('Adonis/Src/Route', 'Route')
  }

  /**
   * Register the server provider under
   * Adonis/Src/Server namespace.
   *
   * @method _registerServer
   *
   * @return {void}
   *
   * @private
   */
  _registerServer () {
    this.app.singleton('Adonis/Src/Server', (app) => {
      const Context = app.use('Adonis/Src/Context')
      const Route = app.use('Adonis/Src/Route')
      const Config = app.use('Adonis/Src/Config')
      const Logger = {
        info (...args) {
          console.log(...args)
        }
      }

      const Server = require('../src/Server')
      return new Server(Context, Route, Logger, Config)
    })
    this.app.alias('Adonis/Src/Server', 'Server')
  }

  /**
   * Registers the hash provider
   *
   * @method _registerHash
   *
   * @return {void}
   *
   * @private
   */
  _registerHash () {
    this.app.bind('Adonis/Src/Hash', () => {
      return require('../src/Hash')
    })
    this.app.alias('Adonis/Src/Hash', 'Hash')
  }

  /**
   * Register the context provider
   *
   * @method _registerContext
   *
   * @return {void}
   *
   * @private
   */
  _registerContext () {
    this.app.bind('Adonis/Src/Context', () => {
      return require('../src/Context')
    })
    this.app.alias('Adonis/Src/Context', 'Context')
  }

  register () {
    this._registerEnv()
    this._registerConfig()
    this._registerContext()
    this._registerRequest()
    this._registerResponse()
    this._registerRoute()
    this._registerServer()
    this._registerHash()
  }

  boot () {
    const Context = this.app.use('Adonis/Src/Context')
    const Request = this.app.use('Adonis/Src/Request')
    const Response = this.app.use('Adonis/Src/Response')

    Context.getter('request', function () {
      return new Request(this.req, this.res, use('Adonis/Src/Config'))
    }, true)

    Context.getter('response', function () {
      return new Response(this.req, this.res)
    }, true)
  }
}

module.exports = AppProvider