resource "azurerm_kubernetes_cluster" "this" {
  name                = var.aks_name
  location            = var.location
  resource_group_name = var.resource_group_name
  dns_prefix          = "hello-otel"

  # System node pool (small/cheap for the lab)
  default_node_pool {
    name                = "system"
    node_count          = 2
    vm_size             = "Standard_B2s"
    only_critical_addons_enabled = false
  }

  # Managed identity for the cluster (modern default)
  identity {
    type = "SystemAssigned"
  }

  # RBAC is on by default with modern provider versions
  # network_profile {} left default (kubenet) for simplicity
}
