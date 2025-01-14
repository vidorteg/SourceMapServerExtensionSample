# Source map server extension sample implementation
Repository containing samples for sourcemap server extensions, this is part of sourcemap server API implementation detailed in here:
https://docs.google.com/document/d/1UL7dIK-yQMiI-qRhbceZ5X6fZNvigEm2Kwz4MJACoLo/edit?pli=1&tab=t.0


# Common Setup
Both options assume the following environment
- Site A: 
  - contains a version of the web application WITH source maps.
  - is served over http://127.0.0.1:8080
- Site B: 
  - contains the same files as site A but WITHOUT sourcemaps
  - is served over http://127.0.0.1:8081

There are two versions of the same web application, one of them has source maps while the other does not have them. The idea is that the extension serve source maps from the site that has source maps to the one that does not have them.
In other words, goal is to serve sourcemaps from Site A, to deployed site B though extensions.


# How to use

There are two folders:
1. `extensions\1st_implementation`
2. `extensions\2nd_implementation`

That can be loaded via `about:extensions` -> `load Unpacked`.

## extensions\1st_implementation
Requires devtools frontend compilation from:

6149670: (Proposal #1) Adding Model and wiring for Sourcemap server (2/2) | https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/6149670

## extensions\2nd_implementation
Requires devtools frontend compilation from:

6166854: (Proposal #2) Adding Model code and wiring for Sourcemap server (2/2) | https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/6166854

With the extension loaded head to `http://127.0.0.1:8081/(landing_page)` on the browser and open Devtools (with the right front_end build). You should see a panel for the new loaded extension with a single button "register" for running the code.

Note:
I tested this with the own devtools build (served from `gen/front_end`) so I recommend that approach.

