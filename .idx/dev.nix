{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.corepack
    pkgs.docker-compose
  ];
  idx.extensions = [
    
  ];

  services.docker.enable = true;

  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}