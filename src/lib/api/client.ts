class Request<R, P extends Record<string, string>, B> {
  #method: string;
  #endpoint: string;
  #params: P;
  #body: B | null;

  constructor({
    method,
    endpoint,
    params = {} as P,
  }: {
    method: string;
    endpoint: string;
    params?: P;
  }) {
    this.#method = method;
    this.#endpoint = endpoint;
    this.#params = params;
    this.#body = null;
  }

  setParams(params: P) {
    this.#params = params;

    return this;
  }

  setBody(body: B) {
    this.#body = body;

    return this;
  }

  async send({ signal }: { signal?: AbortSignal }): Promise<R> {
    const method = this.#method;
    const body = this.#body as BodyInit;
    const url = this.#endpoint.replace(
      /:(\w+)/g,
      (_, key: keyof P) => this.#params[key] || "undefined"
    );

    return new Promise((resolve, reject) => {
      this.#performRequest({ url, method, body, signal: signal as AbortSignal })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  #performRequest({
    url,
    method,
    body,
    signal,
  }: {
    url: string;
    method: string;
    body: BodyInit;
    signal: AbortSignal;
  }) {
    return fetch(url, { method, body, signal }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json().then((data) => data as R);
    });
  }
}

class Client {
  #baseUrl: string;

  constructor({ url }: { url: string }) {
    this.#baseUrl = url;
  }

  createRequest<
    R,
    P extends Record<string, string> = Record<string, string>,
    B extends Record<string, unknown> = Record<string, unknown>,
  >({ method, endpoint }: { method: string; endpoint: string }) {
    return new Request<R, P, B>({
      method,
      endpoint: `${this.#baseUrl}/${endpoint}`,
      params: {} as P,
    });
  }
}

export { Client };
