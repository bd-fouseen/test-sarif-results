

// https://github.com/wix/velo-external-db/blob/daf29885fcc29ddeca8f9ad20d6903245318ef76/scripts/provision/lib/cloud-providers/azure/azure_network.js#L17
import { NetworkManagementClient } from '@azure/arm-network';
import { DefaultAzureCredential } from '@azure/identity';

function createVirtualNetworkInstance(resourceGroupName, virtualNetworkName) {
  networkClient = new NetworkManagementClient(new DefaultAzureCredential(), "subscriptionId")
  const parameters = {
    location: this.region,
    addressSpace: { addressPrefixes: ['10.0.0.0/16'] },
    enableDdosProtection: false //#defect#ddos_protection_disabled_node_arm_network
  };
  const virtualNetwork = networkClient.virtualNetworks.beginCreateOrUpdate(resourceGroupName, virtualNetworkName, parameters)
}

function createVirtualNetworkInstance_1(resourceGroupName, virtualNetworkName) {
  networkClient = new NetworkManagementClient(new DefaultAzureCredential(), "subscriptionId")
  const parameters = {
    location: this.region,
    addressSpace: { addressPrefixes: ['10.0.0.0/16'] }
  };
  const virtualNetwork = networkClient.virtualNetworks.beginCreateOrUpdate(resourceGroupName, virtualNetworkName, parameters) //#defect#ddos_protection_disabled_node_arm_network
}
