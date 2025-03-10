import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IEventListener } from 'jupyterlab-eventlistener';
import { IDocumentManager } from '@jupyterlab/docmanager';


// The Jupyter Event schema for the events we are listing to
const testSchema = 'http://events.cylc.org/test'


// The Jupyter Lab extension
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'cylc-extension:plugin',
  description: 'Listens to Jupyter Lab file open requests from other components.',
  autoStart: true,
  requires: [
    // list a token here and it will be provided to the activate function
    IEventListener,
    IDocumentManager,
  ],
  activate: (
    app: JupyterFrontEnd,
    eventListener: IEventListener,
    documentManager: IDocumentManager,
  ) => {
    console.log('JupyterLab extension cylc-extension is activated!');

    async function handleOpenRequest(manager, schemaID, event) {
      if (event.name === 'open') {
        documentManager.open(event.path)
      }
    }

    eventListener.addListener(
      testSchema,
      handleOpenRequest
    );
  }
};

export default plugin;
