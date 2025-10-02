# Raw kubeconfig if you ever want it directly (usually you’ll use az CLI)
output "kube_config" {
  description = "Raw kubeconfig (sensitive)"
  value       = azurerm_kubernetes_cluster.this.kube_config_raw
  sensitive   = true
}

output "name" {
  value = azurerm_kubernetes_cluster.this.name
}
