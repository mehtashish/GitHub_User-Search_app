# validate_nginx.sh
sudo systemctl status nginx
if [ $? -ne 0 ]; then
  echo "NGINX is not running"
  exit 1
fi