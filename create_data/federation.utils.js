const federationUtilData = `
type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope): void;
  get(module: string): Factory;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

const moduleMap: any = {};

function loadRemoteEntry(remoteEntry: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (moduleMap[remoteEntry]) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = remoteEntry;

    script.onerror = reject;

    script.onload = () => {
      moduleMap[remoteEntry] = true;
      resolve();
    };

    document.body.append(script);
  });
}

async function lookupExposedModule<T>(remoteName: string, exposedModule: string): Promise<T> {
  await __webpack_init_sharing__('default');
  const container = getWindowAsAny()[remoteName] as Container;
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(exposedModule);
  const Module = factory();
  return Module as T;
}

function getWindowAsAny() {
    return window as any;
};

export type LoadRemoteModuleOptions = {
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
};

export async function loadRemoteModule(options: LoadRemoteModuleOptions): Promise<any> {
  await loadRemoteEntry(options.remoteEntry);
  return await lookupExposedModule<any>(options.remoteName, options.exposedModule);
}`;

module.exports = federationUtilData;


