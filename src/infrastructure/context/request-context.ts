import { AsyncLocalStorage } from "node:async_hooks";

/**
 * Interface defining the structure of data stored in the request context
 */
interface RequestContextStore {
  requestId: string;
  // Can be extended with other request-specific data as needed
}

/**
 * Singleton class that provides a context store for request-specific data
 * using AsyncLocalStorage to maintain context across asynchronous operations
 */
class RequestContext {
  private readonly asyncLocalStorage =
    new AsyncLocalStorage<RequestContextStore>();

  /**
   * Get the current request ID from the context
   * @returns The request ID from the current context, or undefined if not in a request context
   */
  public getRequestId(): string | undefined {
    const store = this.asyncLocalStorage.getStore();
    return store?.requestId;
  }

  /**
   * Get the entire current request context store
   * @returns The current request context store, or undefined if not in a request context
   */
  public getStore(): RequestContextStore | undefined {
    return this.asyncLocalStorage.getStore();
  }

  /**
   * Run a function within a request context
   * @param requestId The ID of the current request
   * @param callback The function to run within the request context
   * @returns The result of the callback function
   */
  public run<T>(requestId: string, callback: () => T): T {
    return this.asyncLocalStorage.run({ requestId }, callback);
  }
}

// Export a singleton instance to be used throughout the application
export const requestContext = new RequestContext();
