export const MessageUtil = {
  httpStart(request): string {
    let message = `render start ${request.method} ${request.url}`;

    if (request.method !== 'GET') {
      message = `${message} ${JSON.stringify(request.body)}`;
    }

    return message;
  },
  httpFinish(request, resultStr?: string): string {
    let message = `render finish ${request.method} ${request.url}`;

    if (resultStr) {
      message = `${message} ${resultStr}`;
    }

    return message;
  },
};
