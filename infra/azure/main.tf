# Create a Resource Group
resource "azurerm_resource_group" "rg" {
  name     = var.rg_name
  location = var.location
}

# --- ACR (Azure Container Registry) module ---
module "acr" {
  source              = "../modules/azure-acr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  acr_name            = var.acr_name
}

# --- AKS (Azure Kubernetes Service) module ---
module "aks" {
  source              = "../modules/azure-aks"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  aks_name            = var.aks_name
}

# Helpful outputs
output "acr_login_server" {
  description = "ACR registry URL (use to tag/push images)"
  value       = module.acr.login_server
}

output "aks_name" {
  value = var.aks_name
}
