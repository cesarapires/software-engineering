package com.software.engineering.share.plus.configuration;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;

@Slf4j
public class GlobalLogger {
    // Private static instance variable to hold the single instance of the logger class.
    private static GlobalLogger instance;

    // Private constructor to prevent external instantiation.
    private GlobalLogger() {}
    // Public static method to get the single instance of the logger class.
    public static synchronized GlobalLogger getInstance() {
        if (instance == null) {
            instance = new GlobalLogger();
        }
        return instance;
    }

    // Method to log messages.
    public Logger logger() {
        return log;
    }
}
