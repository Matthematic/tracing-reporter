module.exports = {
    "setupFiles": [
      "regenerator-runtime/runtime"
    ],
    "snapshotSerializers": ["jest-snapshot-serializer-ansi"],
    "moduleNameMapper": {
      "\\.(css|scss|svg)$": "identity-obj-proxy",
      "^aggregated-translations/(.*)$": "<rootDir>/aggregated-translations/$1.js"
    },
    "transformIgnorePatterns": [
      "node_modules/(?!(@mpages)/)"
    ],
    "setupFilesAfterEnv": [],
    "collectCoverage": true,
    "collectCoverageFrom": ["src/**/*.js", "src/**/*.jsx"],
    "coverageDirectory": "coverage",
    "coveragePathIgnorePatterns": ["src/terra-dev-site/*.*", "src/components", "src/index.js"],
    "coverageReporters": ["html", "lcov", "cobertura", "text-summary", "json-summary"],
    "testURL": "http://localhost",
    "modulePaths": ["<rootDir>/src/", "aggregated-translations"],
    "coverageThreshold": {
      "global": {
        "branches": 0,
        "functions": 0,
        "lines": 0,
        "statements": 0
      }
    },
    "reporters": ["default"],
    "testMatch": [
      "**/jest/**/(*.)(spec|test).js?(x)" 
    ]
  }
  