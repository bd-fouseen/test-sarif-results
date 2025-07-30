

// https://github.com/openapi-env-test/azure-sdk-for-js/blob/0541144368ee9adef989f07da783efd7fba75027/sdk/network/arm-network/samples-dev/virtualNetworksCreateOrUpdateSample.ts#L197
import { VirtualNetwork, NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

async function createVirtualNetworkWithServiceEndpointsAndServiceEndpointPolicy_1() {
    const subscriptionId = "subid";
    const resourceGroupName = "vnetTest";
    const virtualNetworkName = "vnet1";
    const parameters: VirtualNetwork = {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        location: "eastus2euap",
        enableDdosProtection: true, //#nodefect#ddos_protection_disabled_node_arm_network
        subnets: [
            {
                name: "test-1",
                addressPrefix: "10.0.0.0/16",
                serviceEndpointPolicies: [
                    {
                        id:
                            "/subscriptions/subid/resourceGroups/vnetTest/providers/Microsoft.Network/serviceEndpointPolicies/ServiceEndpointPolicy1"
                    }
                ],
                serviceEndpoints: [{ service: "Microsoft.Storage" }]
            }
        ]
    };
    const credential = new DefaultAzureCredential();
    const client = new NetworkManagementClient(credential, subscriptionId);
    const result = await client.virtualNetworks.beginCreateOrUpdateAndWait(
        resourceGroupName,
        virtualNetworkName,
        parameters
    );
}
