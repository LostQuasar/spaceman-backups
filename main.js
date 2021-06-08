"use strict";

const config = require("./config.json");

class Main{
    constructor(){
        ModLoader.onPostLoad["spaceman-backups"] = this.BackupProfiles.bind(this);
    }
    
    BackupProfiles()
    {
        const timestamp = TimeUtil.getTimestamp();
        VFS.copyDir("user/profiles/", `user/mods/spaceman-backups/backups/profiles_${timestamp}/`);
        var allBackups = VFS.getDirs("user/mods/spaceman-backups/backups/");
        while (allBackups.length > config.backupQuantity){
            Logger.info(`Spaceman-Backups: Found ${allBackups.length - config.backupQuantity} extra backups deleting them`);
            VFS.removeDir("user/mods/spaceman-backups/backups/"+allBackups[0]);
            allBackups = VFS.getDirs("user/mods/spaceman-backups/backups/");
        }
    }
}

module.exports = new Main();