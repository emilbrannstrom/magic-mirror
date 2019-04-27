# magic-mirror-dashboard
Dashboard for "Magic Mirror" project. Displays weather, transit, news and other info.

![](http://i.imgur.com/j1SUV3h.png)

## Setup

### Development Setup

1. install node & npm
2. install ruby
3. sudo npm install -g grunt
4. gem install bundler
5. npm install
6. bundle install
7. `grunt build`
8. `node index.js`

###  RPi Deployment Setup

#### RPi Setup

Install the latest version of Raspbian. Note that this will only work on an RPi >= 2.

### Disabling the Screensaver

Comment out `@xscreensaver -no-splash` line of `/home/pi/.config/lxsession/LXDE-pi/autostart`, and add the following lines.

```
@xset s off
@xset s noblank
@xset -dpms
```

### Setting up Chrome in Kiosk Mode

Chromium is the only browser that truly works in fullscreen mode without too much hackiness.

Unfortunately it's not in Raspbian's default repos so you'll need to download the `.deb` files and install them yourself using `sudo dpkg -i <package-name>`.

- [libgcrypt11](https://launchpad.net/ubuntu/trusty/armhf/libgcrypt11/)
- [Chromium Codecs](https://launchpad.net/ubuntu/trusty/armhf/chromium-codecs-ffmpeg-extra)
- [Chromium Browser](https://launchpad.net/ubuntu/trusty/armhf/chromium-browser)


To start the browser on startup in fullscreen mode, add the following line to `/home/pi/.config/lxsession/LXDE-pi/autostart`.

```
@chromium-browser --noerrdialogs --kiosk --incognito https://google.com
```

### Hiding the Mouse

Install unclutter `sudo apt-get install unclutter` and add the following line to `/home/pi/.config/lxsession/LXDE-pi/autostart`.

```
@unclutter -idle 0.1 -root' into /etc/xdg/lxsession/LXDE/autostart
```

### Building Assets & Deploying the NodeJS Server

Realistically you should build your CSS offline and push it along with your NodeJS code to its own deployment repo, but for now I'm just building my assets from the dev repository which means I'll need my frontend dev tools installed (compass, grunt, etc).

1. Install the dev version of ruby `sudo apt-get install ruby-dev`
2. Install a modern version of NodeJS
  - `curl -sL https://deb.nodesource.com/setup_6.x | sudo bash -`
  - `sudo apt-get install -y nodejs`
3. Follow steps outlined in 'Development Setup'

### Starting the node app on startup

`@node /home/pi/Projects/magic-mirror-dashboard/index.js < /dev/null &`
