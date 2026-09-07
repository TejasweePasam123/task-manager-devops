resource "azurerm_kubernetes_cluster" "task_manager" {
  name                = "task-manager-aks"
  location            = azurerm_resource_group.task_manager.location
  resource_group_name = azurerm_resource_group.task_manager.name
  dns_prefix          = "task-manager-aks"

  default_node_pool {
    name           = "system"
    node_count     = 1
    vm_size        = "Standard_B2s_v2"
    vnet_subnet_id = azurerm_subnet.aks.id
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin = "azure"
    service_cidr   = "10.1.0.0/16"
    dns_service_ip = "10.1.0.10"
  }

  tags = {
    project     = "task-manager"
    environment = "learning"
    managed_by  = "terraform"
  }
}