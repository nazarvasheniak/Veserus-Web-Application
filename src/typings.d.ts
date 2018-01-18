/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

declare var require: NodeRequire;

interface NodeRequire {
  filename: string;
}
