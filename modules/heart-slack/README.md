# Heart Slack

_Heart Slack_ is a _listener_ module of _Heart_, which reacts to the end of an analysis by sending the results to a _[Slack](https://slack.com)_ channel.

Note that you must install an _analysis_ module too, to have a minimum viable installation of _Heart_.

Read more about [the purpose, design and general installation of _Heart_](https://gitlab.com/fabernovel/heart/-/blob/master/README.md).

# Package manager

In the following sections, every examples are using NPM as package manager, but you can use any other you prefer: Yarn, pnpm...

# Installation

1. Add the package to your project:

    ```shell
    npm install @fabernovel/heart-slack
    ```

2. Add _[Heart CLI](https://www.npmjs.com/package/@fabernovel/heart-cli)_ if you have not already installed it

    ```shell
    npm install @fabernovel/heart-cli
    ```

3. In the project root folder, create a `.env` file with the Slack API token and channel identifier:

    ```dotenv
    SLACK_API_TOKEN=My_Slack_Api_Token
    ```

4. [Optional] Customize the Slack channel:

    By default the #heart channel is used, but you can customize it by adding the `SLACK_CHANNEL_ID` environment variable to your .env file:
    ```dotenv
    SLACK_CHANNEL_ID=#my-custom-channel
    ```

    Note that the channel identifier must follows the format and rules indicated in [the Slack API documentation](https://api.slack.com/methods/chat.postMessage#channels).

# Usage

Start an analysis using one of your _runner_, and watch your _Slack_ channel being updated with the results.
