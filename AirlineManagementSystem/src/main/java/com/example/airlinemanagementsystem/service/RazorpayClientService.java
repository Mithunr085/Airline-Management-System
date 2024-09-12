package com.example.airlinemanagementsystem.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Map;

@Service
public class RazorpayClientService {

    private final RazorpayClient razorpayClient;

    @Value("${razorpay.api.secret}")
    private String razorpaySecret;  // API secret from configuration

    public RazorpayClientService(
        @Value("${razorpay.api.key}") String apiKey,
        @Value("${razorpay.api.secret}") String apiSecret) throws RazorpayException {
        this.razorpayClient = new RazorpayClient(apiKey, apiSecret);
        this.razorpaySecret = apiSecret;  // Store secret key
    }

    public Order createOrder(Map<String, Object> options) throws RazorpayException {
        try {
            // Convert Map to JSONObject
            JSONObject jsonOptions = new JSONObject(options);
            return razorpayClient.orders.create(jsonOptions);
        } catch (RazorpayException e) {
            e.printStackTrace();
            throw new RazorpayException("Error creating Razorpay order", e);
        }
    }

    public boolean verifySignature(String orderId, String paymentId, String signature) {
        try {
            // Construct the payload
            String payload = orderId + "|" + paymentId;
            
            // Use Razorpay's secret key to generate the signature
            String generatedSignature = generateSignature(payload, razorpaySecret);
            
            // Verify if the generated signature matches the provided signature
            return generatedSignature.equals(signature);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private String generateSignature(String payload, String secret) throws Exception {
        // Create the HMAC-SHA256 signature
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] rawSignature = mac.doFinal(payload.getBytes());
        return Base64.getEncoder().encodeToString(rawSignature);
    }
}
