# 📡 Device-Tracking – Full Setup & Usage Guide

This guide explains how to install, configure, and run the **Device-Tracking** project as a Linux service that:

- Starts automatically on boot
- Uses your **Linux username** as the device name (via `whoami`)
- Displays your real-time location on a map

---

## 🧱 Requirements

- Ubuntu or Debian-based Linux
- `nvm` (Node Version Manager)
- Node.js v20+
- systemd (comes pre-installed)

---

## 📁 Project Structure (Already Included)

Make sure your folder looks like this:

```
~/Device-Tracking/
├── app.js
├── package.json
├── public/js/script.js
├── views/index.ejs
├── start-device-tracker.sh        ✅
├── device-tracker.service         ✅
```

---

## 🧰 Step-by-Step Setup Instructions

### ✅ 1. Install Node.js Using `nvm`

If not already installed, run:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
nvm alias default 20
```

Verify:

```
node -v
# Should be v20.x.x
```

---

### ✅ 2. Install Project Dependencies

```
cd ~/Device-Tracking
npm install
```

---

### ✅ 3. Configure `start-device-tracker.sh`

This file already exists in repo copt it to home directory. Make sure it contains:

```
#!/bin/bash

exec > /tmp/device-tracker.log 2>&1

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 20

cd "$HOME/Device-Tracking"
DEVICE_NAME="$(whoami)"
export DEVICE_NAME

node app.js
```

Make it executable:

```
chmod +x ~/start-device-tracker.sh
```

---

### ✅ 4. Register the systemd Service

Copy the service file into the systemd directory:

```
sudo cp ~/Device-Tracking/device-tracker.service /etc/systemd/system/
```

---

### ✅ 5. Enable and Start the Service

```
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable device-tracker.service
sudo systemctl start device-tracker.service
```

---

### ✅ 6. View Logs or Debug

To follow logs in real time:

```
journalctl -u device-tracker.service -f
```

Or check the full log file:

```
cat /tmp/device-tracker.log
```

---

## 🗺️ Access the Tracker

Open your browser and visit:

```
http://localhost:3000
```

You should see a map with your location and device name.

---

## 🔍 How It Works

| Component               | Role                                               |
|-------------------------|----------------------------------------------------|
| `start-device-tracker.sh` | Launches the app and sets the device name         |
| `device-tracker.service`  | Runs the script automatically on system boot      |
| `index.ejs`               | Injects the `DEVICE_NAME` into the frontend       |
| `script.js`               | Sends location + name to the backend via socket   |
| `app.js`                  | Broadcasts data to all connected clients          |

---

## 🧹 Service Management

| Action   | Command                                  |
|----------|-------------------------------------------|
| Restart  | `sudo systemctl restart device-tracker`  |
| Stop     | `sudo systemctl stop device-tracker`     |
| Disable  | `sudo systemctl disable device-tracker`  |

---

## ✅ Summary

- ✔ You already have all necessary files
- 🔧 You just need to install Node, copy the service, and enable it
- 🔁 It will now run automatically on every boot
