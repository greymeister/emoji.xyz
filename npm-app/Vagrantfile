# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "nrel/CentOS-6.7-x86_64"
  config.ssh.private_key_path = "~/.vagrant.d/insecure_private_key"
  config.ssh.insert_key = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 80, host: 1080    # http
  config.vm.network "forwarded_port", guest: 443, host: 10443  # https
  config.vm.network "forwarded_port", guest: 2812, host: 12812
  config.vm.network "forwarded_port", guest: 4001, host: 14001 # etcd
  config.vm.network "forwarded_port", guest: 5432, host: 15432 # postgres
  config.vm.network "forwarded_port", guest: 7001, host: 17001 # etcd
  config.vm.network "forwarded_port", guest: 8080, host: 18080 # http

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
    # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize ["modifyvm", :id, "--memory", "1024"]
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end
end
