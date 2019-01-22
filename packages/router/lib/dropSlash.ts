/*
 * @adonisjs/router
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export function dropSlash (input: string): string {
  if (input === '/') {
    return '/'
  }

  return `/${input.replace(/^\//, '').replace(/\/$/, '')}`
}