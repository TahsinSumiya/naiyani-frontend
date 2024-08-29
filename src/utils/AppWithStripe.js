const AppWithStripe = () => {
    const [isReady, setIsReady] = useState(false);
    const [publishableKey, setPublishableKey] = useState(null);
  
    useEffect(() => {
      const checkStripeReady = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          try {
            const response = await fetch('http://localhost:8000/api/v1/payment/config/', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
  
            if (response.ok) {
              const data = await response.json();
              if (data.publishableKey) {
                setPublishableKey(data.publishableKey);
                setIsReady(true);
              }
            }
          } catch {
            // Handle errors as needed
          }
        }
      };
  
      checkStripeReady();
    }, []);